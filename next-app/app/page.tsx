import styles from "./page.module.css";

export const runtime = "edge";

export default async function Home() {
  const key = "my-key";
  const myKv = process.env.MY_KV;
  await myKv.put(key, "my-value");
  const value = await myKv.get(key);

  let workerRespText = "ERROR: no MY_WORKER found";
  if (process.env.MY_WORKER) {
    const workerResp = await process.env.MY_WORKER.fetch("http://localhost");
    workerRespText = await workerResp.text();
  }

  let doRespText = "ERROR: no MY_DO found";
  try {
    const myDo = process.env.MY_DO;
    const doId = myDo.idFromName("my-do-name");
    const doObj = myDo.get(doId);
    const doResp = await doObj.fetch("http://localhost");
    doRespText = await doResp.text();
  } catch {}

  return (
    <main className={styles.main}>
      <p>
        {" "}
        MY_KV[{key}] = {JSON.stringify(value)}
      </p>
      <p> MY_VAR = {JSON.stringify(process.env.MY_VAR)}</p>
      <p> MY_JSON_VAR = {JSON.stringify(process.env.MY_JSON_VAR)}</p>
      <p> MY_WORKER response = {JSON.stringify(workerRespText)}</p>
      <p> MY_DO response = {JSON.stringify(doRespText)}</p>
      <p> MY_D1 typeof exec = {typeof process.env.MY_D1.exec}</p>
      <p>
        {" "}
        MY_R2 typeof createMultipartUpload ={" "}
        {typeof process.env.MY_R2.createMultipartUpload}
      </p>
    </main>
  );
}
