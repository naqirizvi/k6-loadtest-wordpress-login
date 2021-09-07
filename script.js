import { check, sleep, group } from "k6";
import http from "k6/http";

export const options = {
  insecureSkipTLSVerify: true,
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
  stages: [
    { target: 300, duration: "1m" },
    { target: 20, duration: "3m30s" },
    { target: 0, duration: "1m" },
  ],
  thresholds: {},
};

export default function main() {
  let response;

  const vars = {};

  group("page_2 - https://YOUR-DOMAIN.com/wp-login.php", function () {
    response = http.get("https://YOUR-DOMAIN.com/wp-login.php", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate",
        "accept-language": "en-US,en;q=0.9",
        connection: "keep-alive",
        host: "YOUR-DOMAIN.com",
        "upgrade-insecure-requests": "1",
      },
    });

    vars["testcookie"] = response
      .html()
      .find("input[name=testcookie]")
      .first()
      .attr("value");

    response = http.post(
      "https://YOUR-DOMAIN.com/wp-login.php",
      {
        log: "LOGIN USERNAME",
        pwd: "LOGIN PASSWORD",
        "wp-submit": "Log%20In",
        redirect_to: "http%3A%2F%2FYOUR-DOMAIN.com%2Fwp-admin%2F",
        testcookie: `${vars["testcookie"]}`,
      },
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          connection: "keep-alive",
          "content-type": "application/x-www-form-urlencoded",
          host: "YOUR-DOMAIN.com",
          origin: "https://YOUR-DOMAIN.com",
          "upgrade-insecure-requests": "1",
        },
      }
    );
  });

  group(
    "page_3 - https://YOUR-DOMAIN.com/wp-admin/edit.php?post_type=page",
    function () {
      response = http.get(
        "https://YOUR-DOMAIN.com/wp-admin/edit.php?post_type=page",
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate",
            "accept-language": "en-US,en;q=0.9",
            connection: "keep-alive",
            host: "YOUR-DOMAIN.com",
            "upgrade-insecure-requests": "1",
          },
        }
      );
    }
  );

  // Automatically added sleep
  sleep(1);
}
