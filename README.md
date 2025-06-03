# 🎓Slash – Sharing Grad School Major Transfer Experiences After Bachelor's 

**Submitted by:** _Steven Hsiao_  
**CodePath Intermediate Web Development Course:** Web Development Final Project

**Description:**  
A responsive web application designed to help students share personal experiences of switching graduate school majors after completing their undergraduate studies. Built with a focus on usability, engagement, and clear architecture.

🕒 **Time spent:** ~15 hours total

---

## ✅ Core Features

- 📝 Users can **create posts** with title, optional content, and image (via external URL)
- 🏠 **Home feed** shows posts with title, timestamp, and upvote count
- 📅 **Sorting** by creation time or upvotes
- 🔎 **Search** posts by title
- 📄 **Dedicated post pages** displaying full content and comments
- 💬 **Commenting system** under each post
- ⬆️ **Upvote functionality** (multi-click enabled)
- ✏️ **Edit and delete** options for individual posts

---

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='/slash.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with Gifski

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

---

## 🛠 Tech Stack

- **Frontend:** React.js  
- **Backend:** Supabase *(currently paused)*  

---

## 📁 Project Structure

```
slash/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level React components
│ ├── App.js # Main app logic
│ ├── client.js # Supabase/client config
│ ├── index.js # Entry point
│ ├── App.css
│ └── index.css
├── package.json # Project config and dependencies
├── slash.gif # Demo GIF
└── README.md
```

---

## ⚠️ Status Notice

⚠️ **Supabase backend is currently paused**  
Frontend remains fully functional and all source code is available for review.

---

## License

    Copyright [2024] [Steven Hsiao]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
