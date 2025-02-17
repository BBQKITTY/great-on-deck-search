import ratingImg from "../common/sdhq/rating_img.js";
import logo from "../common/sdhq/logo.js";
import requestBackground from "../common/request_background.js";
import RequestType from "../../background/common/request.js";
import trimHtml from "../common/trim_html.js";
import parser from "../common/parser.js";

/**
 * Creates an HTML element containing the SDHQ logo and rating.
 * @param {SDHQRating} rating rating to display
 * @return {Element}
 */
function createElement(link, rating) {
  const html = trimHtml(`
    <a href="${link}" target="_blank" class="sgodos front-page sdhq rating">
      <img src="${logo}" height="30px">
      <img src="${ratingImg(rating)}" height="25px">
    </a>
  `);
  return parser.parseFromString(html, "text/html").querySelector("a");
}

/**
 * Request SDHQ data for the app of the hero and render a rating if possible.
 * @param {number | string} appId id of the app
 * @param {Element} hero hero element to render the rating onto
 * @return {Promise<void>}
 */
async function sdhqFrontPage(appId, hero) {
  const {data} = await requestBackground(RequestType.SDHQ, appId);
  if (!data.sdhq || !data.sdhq.rating) return;
  hero.append(createElement(
    data.sdhq.rating.link,
    data.sdhq.rating.acf.sdhq_rating
  ));
}

export default sdhqFrontPage;
