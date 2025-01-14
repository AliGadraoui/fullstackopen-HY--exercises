const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal range";
    if (bmi < 30) return "Overweight";
    return "Obese";
};

if (require.main === module) {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);

    if (!height || !weight) {
        console.log("Please provide valid height and weight.");
        process.exit(1);
    }

    console.log(calculateBmi(height, weight));
}

export default calculateBmi;
