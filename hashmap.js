import LinkedList from "./linkedlist.js";
import Node from "./node.js";

export default class Hashmap {
    constructor(){
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.buckets = [];
    }

    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.capacity;
    }

    set(key, value){
        const hashValue = this.hash(key);
        const bucketLimit = this.capacity * this.loadFactor;

        if(this.buckets[hashValue] == null){
            this.buckets[hashValue] = new LinkedList(new Node(key, value));
            
            if(bucketLimit < this.length()){
                this.capacity += 10;
            }

            return;
        }

        // Check if nodes in bucket have the same key to replace its value.
        let currentNode = this.buckets[hashValue];
        while(currentNode != null){
            if (currentNode.key == key){
                currentNode.value = value;
                return;
            }

            currentNode = currentNode.nextNode;
        }

        // add a new node to the bucket if there is already a node inside.
        this.buckets[hashValue].append(new Node(key, value));
        if(bucketLimit < this.length()){
            this.capacity += 10;
        }

    }

    get(key){
        let hashValue = hash(key);
        let currentNode = this.buckets[hashValue];

        while(currentNode != null){
            if(currentNode.key == key){
                return currentNode.value;
            }
            currentNode = currentNode.nextNode;
        }

        return null;
    }

    has(key){
        let hashValue = hash(key);
        let currentNode = this.buckets[hashValue];

        while(currentNode != null){
            if(currentNode.key == key){
                return true;
            }
            currentNode = currentNode.nextNode;
        }

        return false;
    }

    remove(key){
        let hashValue = hash(key);
        let currentNode = this.buckets[hashValue];
        let lastNode = currentNode;

        // handle buckets with single and multiple nodes.

        //case for head node.
        if(currentNode.key == key){
            if(currentNode.nextNode != null){
                currentNode = currentNode.nextNode;
                return true;
            }
            currentNode = null;
            return true;
        }

        //traversing node list to delete the specified node.
        while(currentNode != null){
            if(currentNode.key == key){
                if(currentNode.nextNode != null){
                    lastNode = currentNode.nextNode;
                    return true;
                }
                lastNode.nextNode = null;
                return true;
            }
            currentNode = currentNode.nextNode;
        }

        return false;
    }

    length(){
        let numOfKeys = 0;

        //check each bucket for node.
        for(let i = 0; i < this.capacity; i++){
            let currentNode = this.buckets[i];
            
            if(currentNode != null){  
                //check if bucket has multiple nodes.
                while(currentNode != null){
                    numOfKeys++;
                    currentNode = currentNode.nextNode;
                }
            }
        }

        return numOfKeys;

    }

    clear() {
        this.buckets = Array(this.capacity);
    }

    keys(){
        const keys = [];

        for(let i = 0; i < this.capacity; i++){
            let currentNode = this.buckets[i];

            

        }

        return keys;
    }

    values(){
        const values = [];

        for(let i = 0; i < this.capacity; i++){
            let currentNode = this.buckets[i];

            if(currentNode != null){  
                //check if bucket has multiple nodes.
                while(currentNode != null){
                    values.push(currentNode.value);
                    currentNode = currentNode.nextNode;
                }
            }
        }

        return values;
    }

    entries() {
        const entries = [];

        for(let i = 0; i < this.capacity; i++){
            let currentNode = this.buckets[i];

            if(currentNode != null){  
                //check if bucket has multiple nodes.
                while(currentNode != null){
                    entries.push([currentNode.key, currentNode.value]);
                    currentNode = currentNode.nextNode;
                }
            }
        }

        return entries;
    }

}