export default class LinkedList{
    constructor(head){
        this.head = head;
    }

    append(node){
        let currentNode = this.head;

        while(currentNode != null){
            if(currentNode.nextNode == null){
                currentNode.nextNode = node;
                break;
            }

            currentNode = currentNode.nextNode;
        }

        return 0;
    }
    getKeys(){
        let currentNode = this.head;
        let numOfKeys = 0;

        while(currentNode != null){
            numOfKeys++;
            currentNode = currentNode.nextNode;
        }

        return numOfKeys;
    }
    
}