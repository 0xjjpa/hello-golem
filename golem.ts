import path from "path";
import fs from "fs";
import { Engine, Task, utils, vm, WorkContext } from "yajsapi";
import { program } from "commander";

utils.changeLogLevel("debug");
const SUBNET_TAG = "community.3";

const { asyncWith, logUtils, range } = utils;

(async function main(subnetTag: string) {

  const _package = await vm.repo(
    "190f6597b32e3cc604a8748ba4794ea9e84be8b900f869bc397ae7e4",
    1,
    1.0
  );

  async function* worker(ctx: WorkContext, tasks: any) {
    // Reference to the file to be used in our provider context.
    const inputFile = '/hello-golem/resource/digits.txt'

    // Sending a local file to our provider to be used within its context.
    ctx.send_file(
      path.join(__dirname, "src/digits.txt"),
      inputFile
    );

    for await (let task of tasks) {
      // Obtaining the data passed on each task.
      const instance = task.data();

      // Reference to the filename to be used during task execution.
      const outputFilename = `values-${instance}.json`;

      // Reference to provider file to be generated during our task context.
      const outputFile = `/hello-golem/output/${outputFilename}`;

      // Task being executed and passed as argument to Golem image entrypoint.
      ctx.run("/usr/local/bin/node", [
        "/hello-golem/work/dist/task.js",
        inputFile,
        outputFile
      ]);

      // Reference to the provider generated file locally.
      const localFile = path.join(__dirname, `./${outputFilename}`)

      // Request file created from our provider to our local disk.
      ctx.download_file(
        outputFile,
        localFile
      );

      // Commit task execution.
      yield ctx.commit();

      // Read file from our local file to accept task, temporarily accept w/o verifying.
      const rs = fs.readFileSync(localFile);
      task.accept_task(rs);
    }

    ctx.log("No more actions.");
    return;
  }

  // Dummy array with [0,1] to execute tasks per instance.
  const instances: any[] = range(0, 2, 1);

  await asyncWith(
    await new Engine(
      _package,         // Reference to our Golem image and task requirement. 
      instances.length, // Amount of instances that will be requested from market.
      900000,           // Timeout (5 min)
      "10.0",
      undefined,
      SUBNET_TAG,
      logUtils.logSummary()
    ),
    async (engine: Engine): Promise<void> => {
      for await (let task of engine.map(
        worker,
        instances.map((instance) => new Task(instance))
      )) {
        console.log("result=", task.output());
      }
    }
  );
  return;

})(SUBNET_TAG)