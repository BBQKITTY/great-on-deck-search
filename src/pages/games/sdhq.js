import trimHtml from "../common/trim_html.js";
import logo from "../common/sdhq/logo.js";
import parser from "../common/parser.js";
import requestBackground from "../common/request_background.js";
import RequestType from "../../background/common/request.js";
import ratingImg from "../common/sdhq/rating_img.js";

/**
 * Creates an element for the games list row displaying the SDHQ game rating.
 * @param {string} link url of the game review
 * @param {SDHQRating} stars rating of the game
 * @param {object} cats rating breakdown
 * @return {HTMLAnchorElement}
 */
function createElement(link, stars, cats) {
  const html = trimHtml(`
    <a class="sgodos games-page sdhq review-row" href="${link}" target="_blank">
      <img class="sgodos games-page sdhq logo" src="${logo}">
      <span>:</span>
      <img 
        class="sgodos games-page sdhq stars" 
        src="${ratingImg(stars)}"
        data-tooltip-text="
          Performance: ${cats.performance};
          Visuals: ${cats.visuals};
          Stability: ${cats.stability};
          Controls: ${cats.controls};
          Battery: ${cats.battery};
        "
      >
    </a>
  `);
  return parser.parseFromString(html, "text/html").querySelector("a");
}

/**
 * Places the SDHQ game rating on a game list row.
 * @param {number | string} appId id of the app
 * @param {Element} row row element to inject the review into
 * @return {Promise<void>}
 */
async function sdhqGamesPage(appId, row) {
  let {data} = await requestBackground(RequestType.SDHQ, appId);
  if (!data?.sdhq?.rating?.acf) return;
  row.querySelector(".sgodos.games-page.extra").append(createElement(
    data.sdhq.rating.link,
    data.sdhq.rating.acf.sdhq_rating,
    data.sdhq.rating.acf.sdhq_rating_categories
  ));
}

export default sdhqGamesPage;
