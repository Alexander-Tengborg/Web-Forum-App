export const getThreeSurroundingWords = (input: string, textQuery: string) => {
    let startIndex = input.indexOf(textQuery);
    let endIndex = startIndex + textQuery.length;

    let leftSpaceCount = 0;
    let lastChar = '';
    while(startIndex >= 0) {
        if(input[startIndex] === ' ' && lastChar !== ' ') {
            leftSpaceCount++;
            if(leftSpaceCount == 4) {
                break;
            }
        }

        lastChar = input[startIndex];
        startIndex--;
    }
        
    let rightSpaceCount = 0;
    lastChar = '';
    while(endIndex < input.length) {
        if(input[endIndex] === ' ' && lastChar !== ' ') {
            rightSpaceCount++;
            if(rightSpaceCount == 4) {
                break;
            }
        }

        lastChar = input[endIndex];
        endIndex++;
    }

    let result = input.substring(startIndex, endIndex).trim();

    if(startIndex > 0) {
        result = "..." + result;
    }

    if(endIndex < input.length - 1) {
        result = result + "...";
    }

    return result;
}

export const processResults = (results, textQuery) => {
    let trimmedResults = {};

    for(const result of results) {
        if(!trimmedResults[result.id]) {
            trimmedResults[result.id] = [];
        }

        const trimmedText = getThreeSurroundingWords(result.text, textQuery)

        trimmedResults[result.id].push(trimmedText);
    }

    return {
        'searchResults': trimmedResults
    };
}