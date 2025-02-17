function createHeart() {
  const img = document.getElementById("imagePath");
  const imgRect = img.getBoundingClientRect();

  const heart = document.createElement("div");
  heart.innerHTML = "❤";
  heart.classList.add("floating-heart");
  document.body.appendChild(heart);

  // 随机位置（围绕 girl-dp 图片）
  const startX = imgRect.left + Math.random() * imgRect.width;
  const startY = imgRect.top + imgRect.height + Math.random()*10 - 25; // 从图片下方浮起

  heart.style.left = `${startX}px`;
  heart.style.top = `${startY}px`;

  // GSAP 动画：向上漂浮 + 渐变消失
  gsap.to(heart, {
    duration: 2.5,
    y: -120 - Math.random() * 200, // 随机向上漂浮
    opacity: 0,
    scale: 0.8 + Math.random() , // 随机大小
    rotation: Math.random() * 30 - 15, // 轻微旋转
    ease: "power1.out",
    onComplete: () => heart.remove() // 动画结束后删除
  });
}

function startHearts() {
  // 让爱心动画与 .girl-dp 相关动画同步
  let heartInterval = setInterval(createHeart, 307); 
  
  setTimeout(() => clearInterval(heartInterval), 30000); // 共99个
}

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  // const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];
  
  // textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
  //   .split("")
  //   .join("</span><span>")}</span`;

  // hbd.innerHTML = `<span>${hbd.innerHTML
  //   .split("")
  //   .join("</span><span>")}</span`;

  const wishText = document.querySelector(".wish h5");
  // 遍历 wishText 的子节点，确保只拆分纯文本，保留 HTML 结构
  function wrapTextWithSpans(element) {
    element.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        // 只处理文本节点，拆分成单个字符
        const newHtml = node.textContent
          .split("")
          .map(char => (char.trim() ? `<span>${char}</span>` : char)) // 只包裹非空字符
          .join("");
        const spanWrapper = document.createElement("span");
        spanWrapper.innerHTML = newHtml;
        node.replaceWith(spanWrapper);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 如果是元素节点（如 <br> <a>），递归处理子元素
        wrapTextWithSpans(node);
      }
    });
  }
  wrapTextWithSpans(wishText);
  wrapTextWithSpans(hbd);
  // const newHtml = wishText.textContent
  //   .split("")
  //   .map(char => `<span>${char}</span>`)
  //   .join("");
  // wishText.innerHTML = newHtml;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  // const tl = new TimelineMax();
  const tl = gsap.timeline();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2"
    )
    // .from(".four", 0.7, {
    //   scale: 0.2,
    //   opacity: 0,
    // })
    // .from(".fake-btn", 0.3, {
    //   scale: 0.2,
    //   opacity: 0,
    // })
    // .staggerTo(
    //   ".hbd-chatbox span",
    //   0.5,
    //   {
    //     visibility: "visible",
    //   },
    //   0.05
    // )
    // .to(".fake-btn", 0.1, {
    //   backgroundColor: "rgb(127, 206, 248)",
    // })
    // .to(
    //   ".four",
    //   0.5,
    //   {
    //     scale: 0.2,
    //     opacity: 0,
    //     y: -150,
    //   },
    //   "+=0.7"
    // )
    .from(".idea-1", 0.9, ideaTextTrans)
    .to(".idea-1", 0.9, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.9, ideaTextTrans)
    .to(".idea-2", 0.9, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: -10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.5, ideaTextTrans)
    // .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=0.5"
    )
    .to(".idea-5 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(237, 21, 86)",
      color: "#fff",
    }, "sameTime")
    .to(".idea-4", 0.5, ideaTextTransLeave, "sameTime")
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    // .staggerFrom(
    //   ".idea-6 span",
    //   0.8,
    //   {
    //     scale: 3,
    //     opacity: 0,
    //     rotation: 15,
    //     ease: Expo.easeOut,
    //   },
    //   0.2
    // )
    // .staggerTo(
    //   ".idea-6 span",
    //   0.8,
    //   {
    //     scale: 3,
    //     opacity: 0,
    //     rotation: -15,
    //     ease: Expo.easeOut,
    //   },
    //   0.2,
    //   "+=1"
    // )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .from(
      ".girl-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .call(startHearts)
    // .to(".girl-dp", 1, {
    //   scale: 1.1,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: Power1.easeInOut
    // })
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    // .from(
    //   ".wish h5",
    //   0.5,
    //   {
    //     opacity: 0,
    //     y: 10,
    //     skewX: "-15deg",
    //   },
    //   "party"
    // )
    .from(
      ".wish h5",
      0.3,
      { opacity: 0, y: 5 },
      "party"
    )
    .staggerFrom(
      ".wish h5 span span",
      0.1,
      { opacity: 0, y: 10, ease: Power2.easeOut },
      0.1,
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    );

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).map((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .getElementById(customData)
              .setAttribute("src", data[customData]);
          } else {
            document.getElementById(customData).innerText = data[customData];
          }
        }
      });
    });
};

// Run fetch and animation in sequence
// const resolveFetch = () => {
//   return new Promise((resolve, reject) => {
//     fetchData();
//     resolve("Fetch done!");
//   });
// };
// resolveFetch().then(
animationTimeline();
// );
