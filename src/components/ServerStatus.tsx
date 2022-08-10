import { useAtom, useAtomValue } from "jotai";
import { Suspense, useEffect } from "react";
import { serverStatusAtom } from "../store/store";

const ServerStatus = () => {
  const [serverStatus, update] = useAtom(serverStatusAtom);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      update({ type: "refetch" });
    }, 5000);

    return () => clearInterval(statusInterval);
  }, []);

  return (
    <>
      {serverStatus === false && (
        <div>
          <h2>SERVER IS DOWN!</h2>
        </div>
      )}
    </>
  );
};

export default () => {
  return (
    <Suspense fallback={<></>}>
      <ServerStatus />
    </Suspense>
  );
};
