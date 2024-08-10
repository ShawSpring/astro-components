function createCurrentElement(className:string) {
	const currentElement = new Proxy<{ current: HTMLElement | null }>(
		{ current: null },
		{
			get(target, key) {
				if (key === "current") {
					return target[key];
				}
			},
			set(target, key, value) {
				if (key === "current") {
					if (target[key] instanceof HTMLElement) {
						target[key].classList.remove(className);
					}
					target[key] = value;
					if (target[key] instanceof HTMLElement) {
						target[key].classList.add(className);
					}
				}
				return true;
			},
		},
	);
    return currentElement;  
}

export default createCurrentElement;