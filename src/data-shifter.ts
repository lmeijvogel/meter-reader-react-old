import { UsageData } from "./usage-data";

export class DataShifter {
    call(dataset: (UsageData | null)[], posExtractor: (number) => number): (UsageData | null)[] {
        let output: (UsageData | null)[] = [];

        let lastPositionInOutput = 0;

        dataset.forEach(element => {
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
}
