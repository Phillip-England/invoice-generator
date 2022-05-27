const collectAttributes = (elements, attributeType) => {
    let attributes = []
    for (x = 0; x < elements.length; x++){
        attributes.push(elements[x].getAttribute(attributeType))
    }
    return attributes
}