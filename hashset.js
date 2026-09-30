class HashSet {
    #loadFactor = 0.75;
    #capacity = 16;
    #buckets = [];

    // Takes a string element and produces a hash code with it.
    hash(element) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < element.length; i++) {
            hashCode = (primeNumber * hashCode + element.charCodeAt(i)) % this.#capacity;
        }

        return hashCode;
    }

    // Takes an argument: a element.
    // If the element already exists in the hash set,
    // then the element is not added.
    add(element) {
        const index = this.hash(element);
        if (!this.#buckets[index]) {
            this.#buckets[index] = [];
        }
        for (const entry of this.#buckets[index]) {
            if (entry === element) {
                return;
            }
        }
        this.#buckets[index].push(element);
        if (this.length() > this.#loadFactor * this.#capacity) {
            this.#capacity *= 2;
        }
    }

    // Takes a element as an argument
    // and returns a boolean based on whether or not the element
    // is in the hash set.
    has(element) {
        const index = this.hash(element);
        if (this.#buckets[index]) {
            for (const entry of this.#buckets[index]) {
                if (entry === element) {
                    return true;
                }
            }
        }
        return false;
    }

    // Takes a element as an argument.
    // If the given element is in the hash set,
    // it should remove the entry with that element then return true.
    // If the element isn't in the hash set, it should return false.
    remove(element) {
        if (this.has(element)) {
            const index = this.hash(element);
            for (let i = 0; i < this.#buckets[index].length; i++) {
                if (element === this.#buckets[index][i]) {
                    this.#buckets[index].splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    // Returns the number of stored keys in the hash set.
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

    // Removes all entries in the hash set.
    clear() {
        this.#buckets = [];
        this.#capacity = 16;
    }

    // Returns an array containing all the elements inside the hash set.
    elements() {
        const elements = [];
        for (const bucket of this.#buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    elements.push(entry);
                }
            }
        }
        return elements;
    }
}

export default HashSet;