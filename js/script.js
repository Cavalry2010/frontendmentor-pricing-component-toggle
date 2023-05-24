"use strict";

class Pricing {
  planSelectorBtn = document.querySelector(".plan-selector-btn");
  pricePlansBox = document.querySelector(".price-plans-box");
  plan;
  prices;
  data;

  constructor() {
    console.log("maincra");
    this.init();
    this.planSelectorBtn.addEventListener(
      "click",
      this.changePricePlan.bind(this)
    );
  }

  async getJSON() {
    const data = await fetch("../data.json").then((res) => res.json());
    this.data = data;
  }

  async renderPlans(data) {
    const plans = data;
    plans.forEach((plan) => {
      this.pricePlansBox.insertAdjacentHTML(
        "beforeend",
        `
      <div class="price-plan ${plan.title}-plan">
        <h2 class="price-heading">${plan.title}</h2>
        <p class="price-num"><span class="dollar">&dollar;</span><span class="price">${
          plan[this.plan]
        }</span></p>
        <ul class="plan-features">
            <li>
               <p class="feature">${plan.features.storage} Storage</p>
            </li>
            <li>
                <p class="feature">${plan.features.maxUsers} Users Allowed</p>
            </li>
            <li>
                <p class="feature">Send up to ${plan.features.upload}</p>
            </li>
        </ul>
        <a class="learn-more-link" href="#">Learn More</a>
    </div>`
      );
    });
  }

  changePricePlan() {
    const plan = this.plan === "monthlyPrice" ? "annualPrice" : "monthlyPrice";
    const priceBox = document.querySelector(".price-plans-box");
    this.plan = plan;
    this.planSelectorBtn.classList.toggle("annual");
    priceBox.classList.add("transition");

    setTimeout(
      function () {
        this.data.forEach((data, i) => {
          this.prices[i].textContent = `${data[plan]}`;
        });
        priceBox.classList.remove("transition");
      }.bind(this),
      200
    );
  }

  async init() {
    await this.getJSON();
    this.plan = "monthlyPrice";
    await this.renderPlans(this.data);
    this.prices = Array.from(document.querySelectorAll(".price"));
  }
}

const app = new Pricing();
