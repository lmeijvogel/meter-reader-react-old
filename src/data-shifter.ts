export default class DataShifter {
  call(dataset : number[], posExtractor : (number) => number) {
    let output : any[] = [];

    let lastPositionInOutput = 0;

    dataset.forEach( (element) => {
      const nextPositionInOutput = posExtractor.call(null, element, dataset);

      // I don't really want to handle this case at the moment
      if (nextPositionInOutput < lastPositionInOutput) {
        throw "Unsorted input data";
      }

      while (lastPositionInOutput < nextPositionInOutput) {
        output[lastPositionInOutput] = null;
        lastPositionInOutput++;
      }

      output[nextPositionInOutput] = element;
      lastPositionInOutput = nextPositionInOutput + 1;
    });

    return output;
  }
};
