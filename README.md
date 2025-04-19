Front-end model of a dynamic image gallery website using HTML, CSS, and JavaScript.
Link to website : https://pri998.github.io/SnapStream/

SnapStream is your gateway to a world of stunning, high-quality images drawn straight from the Pixabay API.   
Whether you’re searching for design inspiration, photography references, or just beautiful visuals to brighten your day, 
SnapStream delivers—complete with fun surprises, daily quotes, and a Favorites collection you can build over time.

Why SnapStream?  
• Visual Storytelling: Harness a treasure trove of images from all corners of the world, and tell your own story through them.   
• Frictionless Experience: Everything is just a few clicks away—from searching and downloading to favoriting and sharing.  

FEATURES YOU'LL LOVE :-  
1.	Image Search: Explore an endless variety of images using keywords. Each result shows tags and the photographer’s username, giving you easy access to the image’s details.
2.	Preview & Zoom: Click any thumbnail to open a full-screen modal view. Look at the finer details and learn more about each image right in that modal.
3. Download: Grab & download any image you love with just one click, in your device's storage. A quick fetch ensures you have the highest resolution available from Pixabay.
4. Share: Easily share images with friends, family, or on social media. If your device supports the Web Share API, SnapStream allows one-tap sharing.
5.	Favorite: Found something breathtaking? Mark it as a favorite, and it will be instantly stored in your browser’s localStorage.
6.	My favourites: Visit your personal favorites collection anytime. Favourited image can be downloaded & shared individually.
7.	Un-favourite: In your favourite collection gallery, you can remove individual favorites or clear them all in one go.
8.	Surprise Me: Feeling adventurous? Hit the "Surprise Me" button to see a surprised high-rated image alongwith a surprised quote. Watch festive party emojis rain down your screen, adding a spark of celebration every time you explore something new. You can favourite the surprised image as well.
9.	Daily Inspiration: Start each day with a fresh, uplifting quote to keep you motivated and inspired.
10.	Responsive & Mobile-Friendly: SnapStream automatically adapts to any screen size, whether on desktop, tablet, or smartphone.

LIVE DEMO :-  
Simply open the link to website or open index.html in your favorite browser or host these files on a web server. No extra steps needed!  

HOW IT WORKS :-  
1.	Search Bar: Enter a keyword (e.g., mountains, flowers) and press Search or hit Enter. SnapStream retrieves up to 15 images per page from Pixabay’s large repository.
2.	Pagination: Browse through multiple pages using Next and Previous buttons.
3.	Viewing & Actions: Click on an image thumbnail to open the modal. Inside the modal, you can Download, Favorite, or Share the image immediately.
4.	Favorites: Access your collected favorites anytime by clicking My Favourites. Each favorite can be removed individually or all at once.
5. Surprise Me Feeling lucky? A single click fetches a random gem of an image plus a motivational quote. A playful confetti animation brightens your screen, reminding you that life’s full of pleasant surprises!
6.	Daily Quote: Every day, a different quote helps you set a positive tone for your day.
   
INSTALLATION & SETUP :-  
1.	Clone this repository git clone https://github.com/pri998/SnapStream.git  
2.	Open the project folder and launch index.html in any modern browser.  
3.	(Optional) Use your own Pixabay API key Head over to myscript.js, find the variable APIkey, and replace it with your personal Pixabay API key for extended usage and rate limit benefits.  

PROJECT STRUCTURE :-  
index.html # Entry point of the application  
mystyle.css # Styling & responsive design  
myscript.js # Main JavaScript (fetch, display, favorites, etc.)  
README.md # This very documentation!  

CONTRIBUTING :-  
We welcome your contributions! Here’s how you can help:  
1.	Fork the repo  
2.	Create a feature branch  
3.	Commit your changes  
4.	Submit a pull request  
Want to add new features or enhance the user interface? I’d love to see what you create.  

LICENSE :- This project is licensed under the MIT License. You’re free to use, modify, and distribute it as you wish. Enjoy the creative freedom!  

TECH STACK :- 
HTML5: For the basic structure of the application, semantic markup, and user-facing layout.  
CSS3: Modern responsive design using grid, flexbox, media queries, and transitions for animations and interactive styling.  
JavaScript (ES6+): Asynchronous Programming (using async/await and the Fetch API). Local Storage (storing favorite images in the browser). DOM Manipulation (dynamically rendering images, modals, pagination, etc.). Navigator Share API (enabling quick sharing of images).  
Pixabay REST API: Retrieving royalty-free images based on user queries, with a focus on JSON data handling.  
Vanilla Front-End:  “plain” HTML, CSS, and JS.  
Git & GitHub: For version control, collaboration, and repository management.  

Happy snapping! If you enjoy SnapStream, please give a star on GitHub—your support means a lot. Feel free to explore, discover, and let SnapStream spark your imagination!

