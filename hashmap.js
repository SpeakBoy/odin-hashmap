class HashMap {
    #loadFactor = 0.75;
    #capacity = 16;
    #buckets = [];

    // Takes a string key and produces a hash code with it.
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
        }

        return hashCode;
    }

    // Takes two arguments: a key and a value to asscoitate with the key.
    // If the key already exists in the hash map,
    // then the old value associated with it should be overwritten by the new one.
    set(key, value) {
        const index = this.hash(key);
        if (!this.#buckets[index]) {
            this.#buckets[index] = [];
        }
        for (const entry of this.#buckets[index]) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }
        this.#buckets[index].push({ key, value });
    }

    // Takes a key as an argument
    // and returns the value that is associated with it.
    // If the key is not found, return undefined.
    get(key) {
        const index = this.hash(key);
        if (this.#buckets[index]) {
            for (const entry of this.#buckets[index]) {
                if (entry.key === key) {
                    return entry.value;
                }
            }
        }
        return undefined;
    }

    // Takes a key as an argument
    // and returns a boolean based on whether or not the key
    // is in the hash map.
    has(key) {
        const index = this.hash(key);
        if (this.#buckets[index]) {
            for (const entry of this.#buckets[index]) {
                if (entry.key === key) {
                    return true;
                }
            }
        }
        return false;
    }
}