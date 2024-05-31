let str = "Here's an interesting fact that might add to the discussion...";
let query = "that";

let results = [];

let searchIndex = 0;
while(str.indexOf(query, searchIndex) != -1) {
    let startIndex = str.search(query);
    let endIndex = startIndex + query.length;
    
    searchIndex = endIndex;

    console.log(startIndex + ", " + endIndex);
    console.log(str[startIndex] + ", " + str[endIndex]);

    let leftSpaceCount = 0;
    while(startIndex >= 0) {
        if(str[startIndex] === ' ') {
            leftSpaceCount++;
            if(leftSpaceCount == 4) {
                break;
            }
        }
        startIndex--;
    }
        
    let rightSpaceCount = 0;
    while(endIndex < str.length) {
        if(str[endIndex] === ' ') {
            rightSpaceCount++;
            if(rightSpaceCount == 4) {
                break;
            }
        }
        endIndex++;
    }

    let result = str.substring(startIndex, endIndex).trim();

    if(startIndex > 0) {
        result = "..." + result;
    }

    if(endIndex < str.length - 1) {
        result = result + "...";
    }

    results.push(result);
}

console.log(results);
