import Post from "../models/Post";
import Thread from "../models/Thread";

export const getThreeSurroundingWords = (input: string, textQuery: string) : string => {
    let startIndex: number = input.indexOf(textQuery);
    let endIndex: number = startIndex + textQuery.length;

    let leftSpaceCount: number = 0;
    let lastChar: string = '';
    while(startIndex >= 0) {
        if(input[startIndex] === ' ' && lastChar !== ' ') {
            leftSpaceCount++;

            if(leftSpaceCount == 4)
                break;
        }

        lastChar = input[startIndex];
        startIndex--;
    }
        
    let rightSpaceCount: number = 0;
    lastChar = '';
    while(endIndex < input.length) {
        if(input[endIndex] === ' ' && lastChar !== ' ') {
            rightSpaceCount++;

            if(rightSpaceCount == 4)
                break;
        }

        lastChar = input[endIndex];
        endIndex++;
    }

    let result: string = input.substring(startIndex, endIndex).trim();

    if(startIndex > 0)
        result = "..." + result;

    if(endIndex < input.length - 1)
        result = result + "...";

    return result;
}

export const processResults = (results: (Thread | Post)[], textQuery: string) => {
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