import axios from 'axios';

const appId = 'e230526b';
const appKey = '345085c8454585df8fa0b8ab8aa1fb3e';
const baseUrl = 'https://api.edamam.com/api/food-database/v2/parser';

const searchMeal = async (mealName) => {
    try {
      // Ensure you are using the correct API endpoint and including app_id and app_key in the query
      const response = await axios.get(`${baseUrl}?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(mealName)}`);
      return response.data; // The response from axios is accessed with response.data
    } catch (error) {
      console.error('Error searching for meal:', error);
      throw new Error('Failed to fetch meal data');
    }
};

export default searchMeal;
