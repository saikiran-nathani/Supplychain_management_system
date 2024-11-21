const SHA256 = require('crypto-js/sha256');
const { stringify } = require('querystring');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) != Array(difficulty+1).join("0"))
        {
            this.nounce++;
            this.hash = this.calculateHash();
        }
    }
    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nounce).toString();
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty=5;
    }
    createGenesisBlock(){
        return new Block(0, "16/06/2024", "This is Genesis Block", "0");
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const curentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (curentBlock.hash != curentBlock.calculateHash()) {
                return false;
            }
            else if (curentBlock.previousHash != previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

}
let myCoin=new Blockchain();
console.log("Genesis Block created ...");
console.log(JSON.stringify(myCoin, null, 4));

console.log("Mining Block 1 ....");
myCoin.addBlock(new Block(1,"17/06/2024","21BKT0136: Block 1"));
console.log(JSON.stringify(myCoin, null, 4));
console.log("Mining Block 2 ....");
myCoin.addBlock(new Block(2,"18/06/2024","21BKT0136: block 2"));
console.log(JSON.stringify(myCoin, null, 4))
myCoin.chain[1].hash=myCoin.chain[1].calculateHash();
console.log("is Chain Valid?");
console.log(myCoin.isChainValid());