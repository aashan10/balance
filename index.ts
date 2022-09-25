import Program from "@balance/program";

const program = new Program();

program.run().catch(err => {
    console.error(err);
    process.exit(1);
});