import React, { useEffect, useState } from "react";
import { ClientConfig } from "../../pkg";
import streamSaver from "streamsaver";

type Props = {};

export function useWasmClient() {
  const [client, setClient] = useState<ClientConfig | null>(null);
  useEffect(() => {
    import("../../pkg")
      .then((pkg) => {
        return pkg.default;
      })
      .then((pkg) => {
        setClient(
          pkg.ClientConfig.client_init(
            "lothar.com/wormhole/text-or-file-xfer",
            "wss://mailbox.mw.leastauthority.com/v1",
            "wss://relay.winden.app/",
            2
          )
        );
      });
  }, []);
  return client;
}

export default function App({}: Props) {
  const client = useWasmClient();
  const [code, setCode] = useState("");

  return client ? (
    <div>
      <h1>Send</h1>
      <label>
        File upload:
        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const result = await client.send(file);
              console.log(result);
            } else {
              console.error("File not found");
            }
          }}
        />
      </label>
      <hr />
      <h1>Receive</h1>
      <label>
        Code:
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          onClick={async () => {
            const fileStream = streamSaver.createWriteStream("filename.txt");
            const writer = fileStream.getWriter();
            const result = await client.receive(code, writer);
            console.log(result);
            writer.close();
          }}
        >
          Submit
        </button>
      </label>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
