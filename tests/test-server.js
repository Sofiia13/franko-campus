const { spawn } = require("child_process");
const path = require("path");

describe("Server", function () {
  this.timeout(30000);
  it("Build and run server", function (done) {
    const backendPath = path.join(__dirname, "../backend/app.js");
    const backendProcess = spawn("node", [backendPath]);


    backendProcess.stdout.on("data", function (data) {
      const output = data.toString();
      if (output.includes("SERVER is listening on port")) {
        backendProcess.kill();
        done();
      }
    });


    backendProcess.stderr.on("data", function (data) {
      done(new Error(data.toString()));
    });
  });
});