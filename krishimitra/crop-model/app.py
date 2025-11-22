import os
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Paths ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "crop_model")
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
CSV_PATH = os.path.join(DATA_DIR, "Crop_recommendation_with_soil.csv")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


# --- Utilities ---
def _coerce_features(payload: dict) -> list:
    keys = [
        "Nitrogen",
        "Phosporus",  # keep spelling as requested
        "Potassium",
        "Temperature",
        "Humidity",
        "pH",
        "Rainfall",
    ]
    defaults = {
        "Nitrogen": 0,
        "Phosporus": 0,
        "Potassium": 0,
        "Temperature": 0,
        "Humidity": 0,
        "pH": 7,
        "Rainfall": 0,
    }
    values = []
    for k in keys:
        v = payload.get(k, defaults[k])
        try:
            values.append(float(v))
        except (TypeError, ValueError):
            raise ValueError(f"Feature '{k}' must be numeric")
    return values


def _predict_with_topk(model, feature_list: list, topk: int = 3) -> dict:
    features = [np.array(feature_list)]

    recommended = None
    top_list = []

    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(features)[0]
        classes = getattr(model, "classes_", None)
        if classes is not None:
            crop_probabilities = list(zip(classes, probabilities))
            crop_probabilities.sort(key=lambda x: x[1], reverse=True)
            top_list = [str(name) for name, _ in crop_probabilities[:topk]]
            if top_list:
                recommended = top_list[0]
        else:
            pred = model.predict(features)
            recommended = str(pred[0])
    else:
        pred = model.predict(features)
        recommended = str(pred[0])

    explanation = (
        f"{recommended} is the best crop to be cultivated right there"
        if recommended else "Could not determine the best crop with the provided data."
    )
    return {
        "recommendedCrop": recommended,
        "top3": top_list if top_list else ([recommended] if recommended else []),
        "explanation": explanation,
    }


# --- Model loading (and simple training fallback) ---
_model = None


def _ensure_model():
    global _model
    if _model is not None:
        return _model

    # Try to load a saved model
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as f:
            _model = pickle.load(f)
        return _model

    # Fallback: train a quick model from the CSV if available
    if os.path.exists(CSV_PATH):
        try:
            from sklearn.ensemble import RandomForestClassifier
            from sklearn.model_selection import train_test_split

            df = pd.read_csv(CSV_PATH)
            # Expect a standard dataset with a 'label' column for crop names
            label_col = "label"
            feature_cols = [
                "N",  # Nitrogen
                "P",  # Phosphorus
                "K",  # Potassium
                "temperature",
                "humidity",
                "ph",
                "rainfall",
            ]
            # If alternative columns exist, map them
            if not all(c in df.columns for c in feature_cols) and all(
                c in df.columns for c in [
                    "Nitrogen", "Phosporus", "Potassium", "Temperature", "Humidity", "pH", "Rainfall"
                ]
            ):
                feature_cols = [
                    "Nitrogen", "Phosporus", "Potassium", "Temperature", "Humidity", "pH", "Rainfall"
                ]

            X = df[feature_cols].values
            y = df[label_col].astype(str).values

            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            clf = RandomForestClassifier(n_estimators=200, random_state=42)
            clf.fit(X_train, y_train)

            # Ensure classes_ are strings for predict_proba path
            clf.classes_ = np.array([str(c) for c in clf.classes_])

            with open(MODEL_PATH, "wb") as f:
                pickle.dump(clf, f)
            _model = clf
            return _model
        except Exception:
            pass  # fall through to None

    raise RuntimeError(
        "Model not found. Provide model.pkl next to app.py or include the CSV to auto-train."
    )


# --- Routes ---
@app.route("/api/predict", methods=["POST"])
def api_predict():
    if not request.is_json:
        return jsonify({"error": "Expected application/json body"}), 400

    data = request.get_json(silent=True) or {}
    try:
        float_features = _coerce_features(data)
        model = _ensure_model()
        result = _predict_with_topk(model, float_features, topk=3)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

    response = {
        "inputs": {
            "Nitrogen": float_features[0],
            "Phosporus": float_features[1],
            "Potassium": float_features[2],
            "Temperature": float_features[3],
            "Humidity": float_features[4],
            "pH": float_features[5],
            "Rainfall": float_features[6],
        },
        "prediction": result,
    }
    return jsonify(response), 200


if __name__ == "__main__":
    # Default Flask port is 5000, matching your React fetch
    app.run(host="0.0.0.0", port=5000, debug=True)
