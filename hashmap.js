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
        if (this.length() > this.#loadFactor * this.#capacity) {
            this.#capacity *= 2;
        }
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

    // Takes a key as an argument.
    // If the given key is in the hash map,
    // it should remove the entry with that key the return true.
    // If the key isn't in the hash map, it should return false.
    remove(key) {
        if (this.has(key)) {
            const index = this.hash(key);
            for (let i = 0; i < this.#buckets[index].length; i++) {
                if (key === this.#buckets[index][i].key) {
                    this.#buckets[index].splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    // Returns the number of stored keys in the hash map.
    length() {
        let length = 0;
        for (const bucket of this.#buckets)
        {
            if (bucket) {
                length += bucket.length;
            }
        }
        return length;
    }

    // Removes all entries in the hash map.
    clear() {
        this.#buckets = [];
        this.#capacity = 16;
    }

    // Returns an array containing all the keys (not values)
    // inside the hash map.
    keys() {
        const keys = [];
        for (const bucket of this.#buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    keys.push(entry.key);
                }
            }
        }
        return keys;
    }

    // Returns an array containing all the values (not keys)
    // inside the hash map.
    values() {
        const values = [];
        for (const bucket of this.#buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    values.push(entry.value);
                }
            }
        }
        return values;
    }
}