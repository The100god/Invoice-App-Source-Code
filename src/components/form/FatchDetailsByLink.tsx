import { colorAtom, linkProductTypeAtom, productDetailsAtom, productLinkAmountAtom } from "../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";
import React, { useState } from "react";

const ProductDetailsFetcher: React.FC = () => {
  const [url, setUrl] = useState("");
  const [, setProductDetails] = useAtom(productDetailsAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setProductLinkAmount] = useAtom(productLinkAmountAtom)
  const [, setLinkProductType] = useAtom(linkProductTypeAtom)
  const [,setColor] = useAtom(colorAtom);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError(""); // Clear error when user starts typing
  };

  const fetchProductDetails = async (url: string) => {
    const apiKey = "70b73b9615msh21bb8495fe0f504p108782jsn2e8478ceff95"; // Provided RapidAPI key
    const apiUrl = "https://cheap-web-scarping-api.p.rapidapi.com/api/scrape"; // Scraping API endpoint

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "cheap-web-scarping-api.p.rapidapi.com",
          "X-Rapidapi-Ua": "RapidAPI-Playground",
        },
        body: JSON.stringify({
          url,
          waitUntil: "domcontentloaded",
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const htmlContent = data.html;

      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      // Extract domain from the URL
      const urlObject = new URL(url);
      const domain = urlObject.hostname;

      // Initialize product details
      const details = {
        price: "Price not found",
        color: "Color not found",
        type: "Type not found",
      };

      // Extract product details based on the domain
      switch (true) {
        case domain.includes("amazon") || domain.includes("a.co"):
          details.price =
            doc.querySelector(".a-price-whole")?.textContent?.trim() ||
            "Price not found on Amazon.";
          details.color =
            doc.querySelector("#variation_color_name .selection")?.textContent?.trim() ||
            "Color not found on Amazon.";
          details.type =
            doc.querySelector("#productTitle")?.textContent?.trim() ||
            "Type not found on Amazon.";
          break;

        case domain.includes("flipkart"):
          details.price =
            doc.querySelector(".Nx9bqj")?.textContent?.trim().replace(/[^\d]/g, "") ||
            "Price not found on Flipkart.";
          details.color =
            doc.querySelector(".V3Zflw")?.textContent?.trim() ||
            "Color not found on Flipkart.";
          details.type =
            doc
              .querySelector("._7dPnhA")
              ?.querySelectorAll(".r2CdBx")[1]
              ?.querySelector("a")?.textContent?.trim() ||
            "Type not found on Flipkart.";
          break;

        case domain.includes("walmart"):
          details.price =
            doc
              .querySelector('span[itemprop="price"][data-seo-id="hero-price"][data-fs-element="price"]')
              ?.innerHTML || "Price not found on Walmart.";
          details.color =
            doc.querySelector('div[data-testid="variant-group-0"] .mid-gray span.ml1')?.textContent?.trim() ||
            "Color not found on Walmart.";
          details.type =
            doc.querySelector("#main-title")?.textContent?.split(",")[0].trim() ||
            "Type not found on Walmart.";
          break;

        case domain.includes("ebay"):
          details.price =
            doc.querySelector(".x-price-primary .ux-textspans")?.textContent?.split(" ")[1].trim() ||
            "Price not found on eBay.";
          details.color =
            doc.querySelector(".btn__text")?.textContent?.trim() ||
            "Color not found on eBay.";
          details.type =
            doc.querySelector("dl.ux-labels-values--model dd .ux-textspans")?.textContent?.trim() ||
            "Type not found on eBay.";
          break;

        case domain.includes("target"):
          details.price =
            doc.querySelector(".sc-d5906eb3-1")?.textContent?.trim() ||
            "Price not found on Target.";
          details.color =
            doc.querySelector("div.sc-40df79dd-1.kda-dqB")?.textContent?.trim() ||
            "Color not found on Target.";
          details.type =
            doc.querySelector("h1[data-test='product-title']")?.textContent?.trim() ||
            "Type not found on Target.";
          break;

        default:
          details.price = "Domain not supported or price not found.";
          details.color = "Domain not supported or color not found.";
          details.type = "Domain not supported or type not found.";
          break;
      }
      setProductLinkAmount(details.price)
      setLinkProductType(details.type)
      setColor(details.color)
      setProductDetails(details);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to fetch product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!url.trim()) {
        setError("Please enter a valid URL.");
      } else {
        setError("");
        console.log("URL Submitted:", url);
        // Add your fetch function here
        fetchProductDetails(url);
      }
    }
  };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (url.trim()) {
//       fetchProductDetails(url);
//     } else {
//       setError("Please enter a valid URL.");
//     }
//   };

  return (
    <div className="w-full flex flex-col justify-start dark:bg-black dark:text-white">
      <label htmlFor="product-url" className="flex text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
        Fetch Price Via URL*
      </label>
      <input
        id="product-url"
        type="url"
        placeholder="https://link of Item"
        value={url}
        onChange={handleUrlChange}
        onKeyDown={handleKeyPress}
        className="block w-full h-[55px] px-4 py-2 text-[18px] outline-none border-2 border-[#A9A5A5] dark:bg-black dark:text-white dark:border-white rounded-[10px] focus:border-[#00C5FF]"
      />
      {error && <p className="text-red-500 text-xs mt-2 bg-transparent">{error}</p>}
    </div>
  );
};

export default ProductDetailsFetcher;
