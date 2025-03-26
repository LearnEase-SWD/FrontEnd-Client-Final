import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb";
import { useState } from "react";

const FAQsPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTitle, setActiveTitle] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index); // If the same FAQ is clicked, close it.
    setActiveTitle(activeTitle === index ? null : index);
  };

  return (
    <div className="mt-2">
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
      </div>

      <section>
        <div className="p-4">
          <h1 className="mt-5 mb-2.5 font-semibold text-3xl sm:text-4xl">
            Faqs
          </h1>
        </div>
        {/* Flexbox with responsive column stack */}
        <div className="flex flex-col md:flex-row md:justify-around">
          {/* Left side FAQs */}
          <div className="p-4 w-full md:w-1/2">
            {/* FAQ 1 */}
            <div className="pt-5 pb-5 px-4 sm:px-7 mb-5 bg-gray-100 rounded-md">
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleFAQ(1)}
              >
                <a className={`font-semibold text-lg sm:text-xl ${activeTitle === 1 ? "text-orange-400" : ""}`}>
                  Why is my website so slow? How to improve website speed in WordPress?
                </a>

                <span>
                  <i
                    className={`fas fa-chevron-${openFAQ === 1 ? "up" : "down"}`}
                  ></i>
                </span>
              </div>
              <div
                className={`transition-all duration-500 overflow-hidden ${openFAQ === 1 ? 'max-h-screen' : 'max-h-0'}`}
              >
                <div className="mt-4 text-gray-700 text-sm sm:text-base">
                  <p>
                    Have a complaint about speed for our website?
                    <a
                      href="https://thimpress.com/improve-website-speed-wordpress-website-slow-fix/"
                      target="_blank"
                      rel="noopener"
                      className="hover:text-orange-400 font-semibold"
                    >
                      {" "}
                      Read this article carefully
                    </a>
                    . There are many reasons why the theme runs fast on some sites but slow on some other sites.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="pt-5 pb-5 px-4 sm:px-7 mb-5 bg-gray-100 rounded-md">
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleFAQ(2)}
              >
                <a className={`font-semibold text-lg sm:text-xl ${activeTitle === 2 ? "text-orange-400" : ""}`}>
                  How to Prevent Content Thieves From Stealing Your Content?
                </a>
                <span>
                  <i
                    className={`fas fa-chevron-${openFAQ === 2 ? "up" : "down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`transition-all duration-500 overflow-hidden ${openFAQ === 2 ? 'max-h-screen' : 'max-h-0'}`}
              >
                <div className="mt-4 text-gray-700 text-sm sm:text-base">
                  <p>
                    Piracy of Digital <strong>Content </strong>
                    is now one of the most irritating problems regarding copyright and selling products online.
                    This is seemingly more correct in the world of online course when people could just copy your course material
                    and download your video lectures easily.
                    Although there’s no way to 100% prevent others from stealing your content,
                    there are some methods to make it harder for people to copy your
                    <strong>
                      <a href="https://thimpress.com/wordpress-how-to-prevent-content-thieves-from-stealing-your-content-course-video"
                        target="_blank"
                        rel="noopener"
                        className="hover:text-orange-400"> content</a>
                    </strong>
                    . This article will examine all effective methods of anti-content theft, from disabling right-click to using pricey services from giant tech companies.<br />
                    <a href="https://thimpress.com/wordpress-how-to-prevent-content-thieves-from-stealing-your-content-course-video/"
                      target="_blank"
                      rel="noopener"
                      className="hover:text-orange-400 font-semibold">How to Prevent Content Thieves From Stealing Your Content</a>
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="pt-5 pb-5 px-4 sm:px-7 mb-5 bg-gray-100 rounded-md">
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleFAQ(3)}
              >
                <a className={`font-semibold text-lg sm:text-xl ${activeTitle === 3 ? "text-orange-400" : ""}`}>
                  How to translate LearnPress plugin with the Loco Translate
                  plugin?
                </a>
                <span>
                  <i
                    className={`fas fa-chevron-${openFAQ === 3 ? "up" : "down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`transition-all duration-500 overflow-hidden ${openFAQ === 3 ? 'max-h-screen' : 'max-h-0'}`}
              >
                <div className="mt-4 text-gray-700 text-sm sm:text-base">
                  <p>
                    Read more:
                    <a href="https://thimpress.com/knowledge-base/learnpress-translation/"
                      target="_blank"
                      rel="noopener"
                      className="hover:text-orange-400 font-semibold"> LearnPress Translation</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side FAQs */}
          <div className="p-4 w-full md:w-1/2">
            {/* FAQ 4 */}
            <div className="pt-5 pb-5 px-4 sm:px-7 mb-5 bg-gray-100 rounded-md">
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleFAQ(4)}
              >
                <a className={`font-semibold text-lg sm:text-xl ${activeTitle === 4 ? "text-orange-400" : ""}`}>
                  Why missing style.css stylesheet when installing the theme?
                  Missing stylesheet error when installing the theme
                </a>
                <span>
                  <i
                    className={`fas fa-chevron-${openFAQ === 4 ? "up" : "down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`transition-all duration-500 overflow-hidden ${openFAQ === 4 ? 'max-h-screen' : 'max-h-0'}`}
              >
                <div className="mt-4 text-gray-700 text-sm sm:text-base">
                  <p>
                    Read more:
                    <a href="https://thimpress.com/knowledge-base/missing-style-sheet-error-installing-theme/"
                      target="_blank"
                      rel="noopener"
                      className="hover:text-orange-400 font-semibold"> Missing style sheet error when installing the theme</a>
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="pt-5 pb-5 px-4 sm:px-7 mb-5 bg-gray-100 rounded-md">
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleFAQ(5)}
              >
                <a className={`font-semibold text-lg sm:text-xl ${activeTitle === 5 ? "text-orange-400" : ""}`}>
                  List of some issues and how to fix
                </a>
                <span>
                  <i
                    className={`fas fa-chevron-${openFAQ === 5 ? "up" : "down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`transition-all duration-500 overflow-hidden ${openFAQ === 5 ? 'max-h-screen' : 'max-h-0'}`}
              >
                <div className="mt-4 text-gray-700 text-sm sm:text-base">
                  <p>To make it easier for LearnPress users to update to the 4.0 version, the following is the list of some issues that LearnPress users are facing and how to fix them.</p> <br />
                  <ol>
                    <li>
                      <strong>Error: Specified key was too long; max key length is 1000 bytes</strong>
                    </li>
                  </ol>
                  <p>MySQL version older than 5.7 leads to this error. You need to update your MySQL to the newest version, and then update LearnPress 4.0 once again.</p> <br />
                  <ol>
                    <li>
                      <strong>Error: LearnPress Add-ons cannot be active</strong>
                    </li>
                  </ol>
                  <p>In the fourth version of LearnPress, we require all add-ons have to update to the version 4.0, too.</p> <br />
                  <p>For example: If your WooCommerce add-on for LearnPress is in 3.x.x version and when you install LearnPress 4.0, the WooCommerce add-on will be disabled automatically, you need to update it.</p>
                  <br /><p><strong>How to update your Add-Ons?</strong></p><br />
                  <p>2.1. For the users using our premium WordPress Themes from ThemeForest.</p><br />
                  <p>Go to Dashboard -&gt;Theme -&gt;Plugin -&gt;Update all add-ons to the newest version.</p><br />
                  <p>2.2. For users from purchased our add-ons from ThimPress.</p><br />
                  <p>LearnPress add-ons will not be updated automatically. If you want to update it, please follow these steps below:</p><br />
                  <ul>
                    <li>Delete the add-ons that you want to update on your website</li>
                    <li>
                      Go to this page: <a href="https://thimpress.com/my-account/downloads/" target="_blank" rel="noopener" className="hover:text-orange-400 font-semibold"> https://thimpress.com/my-account/downloads </a>
                      and download the latest versions of the add-ons that you want.
                    </li>
                    <li>Re-install your add-ons with the latest version.</li><br />
                  </ul>
                  <ol>
                    <li>
                      <strong>ThimCore cannot be active</strong>
                    </li>
                  </ol><br />
                  <p>
                    If you are using ThimCore version 1.x.x, you cannot activate it to download the new add-ons. In this case, you need to delete your ThimCore and you will receive the notification about re-install it. Click to this notification to install the newest version of <strong>ThimCore (2.x.x)</strong>
                    . If after re-install ThimCore plugin still have version 1.x.x, you can download version 2.x.x on our GitHub, click
                    <strong>
                      <a href="https://github.com/ThimPressWP/thim-core/archive/refs/heads/gh-pages.zip"
                        target="_blank"
                        rel="noopener nofollow"
                        className="hover:text-orange-400"> here </a>
                    </strong>
                    to download.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="pt-5 pb-5 px-4 sm:px-7 mb-5 bg-gray-100 rounded-md">
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleFAQ(6)}
              >
                <a className={`font-semibold text-lg sm:text-xl ${activeTitle === 6 ? "text-orange-400" : ""}`}>
                  LearnPress Shortcodes
                </a>
                <span>
                  <i
                    className={`fas fa-chevron-${openFAQ === 6 ? "up" : "down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`transition-all duration-500 overflow-hidden ${openFAQ === 6 ? 'max-h-screen' : 'max-h-0'}`}
              >
                <div className="mt-4 text-gray-700 text-sm sm:text-base">
                  <p>
                    Read more: <a href="https://thimpress.com/the-complete-list-of-learnpress-shortcodes/" target="_blank" rel="noopener" className="hover:text-orange-400 font-semibold"> The complete list of LearnPress Shortcodes</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Image section */}
        <div className="pl-4 pr-4 mt-7">
          <img
            src="https://ucarecourse.com/wp-content/uploads/2023/02/faqs.png"
            alt="FAQs"
          />
        </div>
      </section>
    </div>
  );
};

export default FAQsPage;
