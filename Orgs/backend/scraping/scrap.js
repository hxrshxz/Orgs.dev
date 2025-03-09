import pw from "playwright";
import retry from "async-retry";
import fs from "fs";

let jsonData = [
  {
    "name": "string",
    "image_url": "string",
    "image_background_color": "string",
    "description": "string",
    "url": "string",
    "category": "string",
    "topics": [
      "string"
    ],
    "technologies": [
      "string"
    ],
    "years": {
      "2016": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      },
      "2017": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      },
      "2018": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      },
      "2019": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      },
      "2020": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      },
      "2021": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      },
      "2022": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      },
      "2023": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      },
      "2024": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      },
      "2025": {
        "projects_url": "string",
        "num_projects": 0,
        "projects": [
          {
            "title": "string",
            "short_description": "string",
            "description": "string",
            "student_name": "string",
            "student_blog_url": "string",
            "student_github_url": "string",
            "project_skills": "string",
          }
        ]
      }
    }
  }
]

async function main() {
  const browser = await pw.chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.outreachy.org/alums/");

  // Extracting years
  const yearsData = [];
  const years = await page.getByRole("link").all();
  for (const year of years) {
    const text = await year.textContent();
    const match = text.match(
      /(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}/
    );
    if (match) {
      yearsData.push(match[0]);
    }
  }

  // Extracting organization names
  const orgsData = [];
  const orgs = await page.locator(".card-header").all();
  for (const org of orgs) {
    const name = await org.textContent();
    orgsData.push(name.trim());
  }

  // Combining data
  const exampleData = orgsData.map((name, index) => ({
    name,
    years: yearsData[index] || "Unknown Year", // Match orgs with years, default to "Unknown Year" if not available
  }));

  console.log(exampleData);

  // Optionally save to a JSON file
  fs.writeFileSync('exampleData.json', JSON.stringify(exampleData, null, 2));
}

await retry(main, {
  retries: 3,
  onRetry: (e) => {
    console.log("🔄 Retrying...", e);
  },
});
