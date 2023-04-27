export function htmltojson(element) {
    var JsonLocal = {};
    JsonLocal = {
        type: element.localName,
        attributes: [],
        content: [],
    };
    for (var i = 0; i < element.attributes.length; i++) {
        JsonLocal.attributes.push({
            name: element.attributes[i].name,
            value: element.attributes[i].value,
        });
    }
    if (element.childNodes.length != 0) {
        Array.from(element.childNodes).forEach((e) => {
            if (e.nodeType == 3) {
                JsonLocal.content.push({
                    type: "text",
                    textContent: e.nodeValue
                        .replace("<", "&lt;")
                        .replace(">", "&gt;"),
                });
            } else {
                JsonLocal.content.push(htmltojson(e));
            }
        });
    }
    return JsonLocal;
}