// import React from "react";

export async function getDataFromModel(proportions) {

    const res = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(proportions)
    })

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        throw new Error(res.error || `API failed with ${res.status}`);
    }
}