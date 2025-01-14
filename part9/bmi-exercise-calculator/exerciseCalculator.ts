interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h > 0).length;
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;

    let rating;
    let ratingDescription;
    
    if (average >= target) {
        rating = 3;
        ratingDescription = "Great job! You met your target!";
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "Not too bad, but could be better.";
    } else {
        rating = 1;
        ratingDescription = "You need to train harder.";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

if (require.main === module) {
    const target = Number(process.argv[2]);
    const dailyHours = process.argv.slice(3).map(Number);

    if (!target || dailyHours.some(isNaN)) {
        console.log("Please provide valid numbers.");
        process.exit(1);
    }

    console.log(calculateExercises(dailyHours, target));
}

export default calculateExercises;
