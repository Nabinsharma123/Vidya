export function jsontohtml(Json) {
    var elementLocal = document.createElement(Json.type);
    Json.attributes.forEach((e) => {
        elementLocal.setAttribute(e.name, e.value);
    });
    Json.content.forEach((e) => {
        if (e.type == "text")
            elementLocal.innerHTML = elementLocal.innerHTML + e.textContent;
        else elementLocal.appendChild(jsontohtml(e, elementLocal));
    });
    return elementLocal;
}