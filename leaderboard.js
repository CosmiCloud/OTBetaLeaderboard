const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3("https://polygon-mumbai.g.alchemy.com/v2/J7XMHsaVUlPK2lrj2q_u5pcjBSEmTjtI");
const { Console } = require('console');
const { Transform } = require('stream');

const leaderboard = async () => {

  const node_runners = [
    "0x11c66439923C5Da8296C7ff3725a56CD8e3d978e",
    "0x490618BE2457f2789e580335F7171C70E7E511b1",
    "0xC967d421A856AcBa6fBe4a6E530A09Ef9B268CA2",
    "0xC3edFfF56E2BBf0B6439576938E0d8c213e0bEf6",
    "0xa705c6A78d99001383C39946225B0E22630A0BdF",
    "0x19122EF9a3BE2694AA4f9439E132E1D07fE363D5",
    "0x46FBcEfD4372ad429a703206e965dbF1264c491B",
    "0x978a264CEA0dB705Ba23E5aaAB4815D91eD66fA6",
    "0x2fe6CEa6893F97834d59e7fb963E88d33708093C",
    "0x09D88eAbD226f94c14d89DFAad63221E3438d9Df",
    "0x2Ecc6F12052d09E8B4F7Ec9E404793D70Fb2B0e4",
    "0x5d8f98db8d4b9dd676e9cfefbd42ec051c1fd970",
    "0x0ccb8f239b0e80bfe76e4968cbbb5791d1f88064",
    "0x23852ad4213645013e5b073738a8514f88ecf5be",
    "0xcdd102135b2067ca4d569af824e55e3e3e9d4813",
    "0x5bd1ac6a24cde533c303cfb9b2b2c11414820a0a",
    "0x770da95a2605e03d965591ced1cd2cb5595f8001",
    "0xd545e578d9b1885ed809e692c74bf7ab4c577e39",
    "0x4e482c815c1ce62a9654a0bf5af388b0aaa1f5ee",
    "0xe7bc9fd07ea59113f3991e0d9ab24a052b3e8222",
    "0x6ecdfbe8b8287b1ba8635287539e71dd761c5921",
    "0x23c9cf3510bb86a726d0f6d673296f69f41e720d",
    "0x2efac3242fbdc5f1bd98f1070eeed52da505d814",
    "0x75f4d8bad35978def6bdb2d1826317a1a4e0e937",
    "0x14dd9c583458759b06b4510bc8f745a24520bcb5",
    "0x7fb8c68eb7a40f4459ebd18c77d8547ebd36bd6b",
    "0x8b3af4add6f3b8d85d5fb62dcbc5e2de26ac3cc3",
    "0x34048a183ab38ba100b697e2f0d9688f05539a0f",
    "0x7ca1e583b03bc6b64848d1b10c1b528ef5383899",
    "0x4fff8fef305ca9b347865cd640166218082a1a0f",
    "0x605Aa07CDF777Bf516f92871ECB154B8C86918bd",
    "0x2AED88b728f69BDF8f139a38531103A655d6b5Dc",
    "0xbC1882BB618251390b9156d0AA576f88E65e1EE6",
    "0x388Fe4aAB5544A33151F1b55a08bEa6aD883E4df",
    "0xCa215cc5D8c1B29D9D1fFd3683E34681c8cf2EAd",
    "0x02fFE8A489493BFB74253aE703C5264a6fbA33fB",
    "0x8a5142a915de9616e2a49CeFB39F22D96Ce0Bf5f",
    "0x9E9FD8d7832E85FF70D75A20dB648d35ed3D71c4",
    "0x3A7498379034CAab6dfBAeeD3255a6e126DEF88e",
    "0xd66af985F22E844577d2C713d3E57Da9452F9C58",
    "0x23A286797B4CA45ef1545B3e5efb35264489D924",
    "0x83814b0054B0E8dECA58e2eC4C7B4a7167377857",
    "0x84352EFE8304706ff0eF77a8B48FB3a7E18c358A",
    "0xBb44ff79D06077099530629FEB617174c86FB439",
    "0x7d396f5Dee5Ed84aa3B07DEF78aCb4AF4dAb9816",
    "0xABa45E475E667Cd838C0C0FEF7E46702D14d827a",
    "0xF5c54A4461Ac98167aF39700DbB25B8e49b8FC97",
    "0xcffe062545633cd0D0824e75824282A682481c12",
    "0xf4b0A6979AeacFd8e00a4c984AB2fFa750565142",
    "0xF3ACc2b78A68aB15Bd679B952cDdcD463467a931",
    "0x13650C05Fa5a988a8aE3bE257Fc39f68f0a99321",
    "0x300C24C37BAf2B02E6BdCEBC6Adc8aa8d54B3811"
   ]
  node_runner_results ={};
  key = "nodes"
  node_runner_results[key] = [];

  for(var i = 0; i < node_runners.length; i++) {
      address = node_runners[i];
      txnCount = await web3.eth.getTransactionCount(address);

      nude_runner_info = {
        Node_Address: address,
        Publishes: txnCount
      }

      await node_runner_results[key].push(nude_runner_info);
    }

  sorted_node_runner_results = node_runner_results.nodes.sort(function(a, b) {return a.Publishes - b.Publishes});
  node_runner_results = sorted_node_runner_results.reverse();
  //console.table(node_runner_results);

  function table(input) {
  // @see https://stackoverflow.com/a/67859384
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
  const logger = new Console({ stdout: ts })
  logger.table(input)
  const table = (ts.read() || '').toString()
  let result = '';
  for (let row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    result += `${r}\n`;
  }
  console.log(result);
}

await table(node_runner_results);
};

leaderboard().catch((error) => console.log(`\x1b[35m${error}`));
