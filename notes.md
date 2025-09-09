# Martin's Movies

Additional notes from build process.

## Assumptions

1. Interpreted the requirement of searching movies by _Keyword_ to search by title i.e. Avatar, John Wick, The Lord of the Rings
   > allow customers to search by different movie attributes which are: Keyword
   - Didn't realise searching by Keyword meant something totally different in TMBD.
2. Interpreted this requirement to use `localstorage`
   > mark a movie as 'watched' so when they open the listing page again in the same browser it will still be marked as 'watched'

## Decisions

1. Didn't include the grid layout switch from the example layout for this exercise [https://gnodesign.com/templates/movify/movie-grid.html](https://gnodesign.com/templates/movify/movie-grid.html)
2. Included a guest login feature for marking and unmarking watched movies.
   - For this app and scope, I went with the guest login to keep a watched movies list
   - Decision of using `localstorage` vs creating a user account. Creating a user account was determined to be out of scope for this exercise but can be added on as a feature enhancement.
   - > Reflection: Could I have saved a true/false value to the movie ID? That would determine whether a movie has been watched.

### Design

1. Left aligned rather than center aligned the text due to the layout of the movie card with the watched heart button due to spacing.
2. Used 'Previous Page' and 'Next Page' links for pagination based off number of pages from the results.
   - > Reflection: Keep the individually listed pages from the example layout. This is a better solution for larger page numbers but also add buttons for first and last pages.
3. Used a rating out of 10 text for the movie rating instead of the star rating based on the number rating from the API.

## Issues Faced

1. Unexpected results with the Search API URLs.
   - Initially tried searching by Keyword [https://developer.themoviedb.org/reference/search-keyword](https://developer.themoviedb.org/reference/search-keyword)
   - Had to know what the Keyword IDs are and make another API call to search using those keywords [see here](https://www.themoviedb.org/talk/60a2ec6600bfe8002ad070d8)
   - Switched to searching movie by title to get intended/expected results [https://developer.themoviedb.org/reference/search-movie](https://developer.themoviedb.org/reference/search-movie)
2. Initially created a default movie list on the landing page with pagination [see here](https://github.com/Kangb0tmang/martins-movies-arcadian/commit/52957cbbc1f234488e33ab65485b98a2c725666f) since the user hasn't searched for anything.
   - Default listing landing page was an added feature was not part of the original scope.
   - Building the search functionality with a results page would have been the better course of action.

## Future Enhancements

1. Add tests and change the components file structure.
2. For the default listing/landing page:
   1. Get popular or currently playing movies if there are no movies marked as watched or if a user is not logged in
   2. If a user is logged in, fetch the movies marked as watched. If there are no watched movies, get the popular or currently playing movies
3. Create a user account instead of using the guest login session
4. Change the pagination to add a 'First Page' and 'Last Page' link (based on client requirements).
5. Change how the search bar works i.e. autocomplete/autopopulate, search on keypress (based on client requirements).
6. Add a filter system to the movie listing page.
7. Replace the 'Loading' text with a loading component.
