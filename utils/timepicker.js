// convert string time to seconds
const stringToSeconds = ( stringTime ) => {
    const res = stringTime.split(":").map(ele => Number(ele)); // Hours, Minutes
    const seconds= res[0]*60*60 + res[1]*60
    return seconds;
}

// returns duration from start to end in minutes 
const findSlot = (start, end )=>{
    const durationMin = (end.getTime() - start.getTime())/(1000*60)
    return durationMin
}

// Time are given in minutes
const voteTimeslot = ( startTime , endTime , timeline ) => {
    startIndex = startTime / 30 ; //Assign 1 at this index
    endIndex = endTime / 30 ; //Assign -1 at this index
    timeline[startIndex] += 1
    timeline[endIndex] -= 1
    return timeline;
}

const findPresum = (timeline) => {
    presum = []
    presum.push(timeline[0]);
    for(var i = 1 ; i < timeline.length(); i++ ){
        presum.push(timeline[i] + presum [i-1])
    }
    return presum; 
}

// find max frequency window, returns object of best slots to worst slots
const resultSlot = (slidingWindow , presumArray) => {
    freqArray = []
    for(var i = 0; i < (presumArray.length() - slidingWindow + 1)  ; i+=1 ){
        sum = 0;
        for(var j=0;j < slidingWindow; j++){
            sum += presumArray[i+j];
        }
        freqArray.push({ i : sum });
    }
    freqArray.sort((a,b) => a.sum - b.sum )
    return freqArray;
}

module.exports = { 
    stringToSeconds,
    findSlot,
    voteTimeslot,
    findPresum,
    resultSlot
}