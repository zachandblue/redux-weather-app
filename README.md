This is a 5 Day Forecast app build with React and Redux. I didn't have to rely too heavily on Redux for this, as it just makes one GET request to the Open Weather Map Api from https://openweathermap.org/. The tricky part was working with the data that was returned.

It returns weather data for the next five days in three-hour chunks. I wanted the App to show the day, the general forecast, and the high and low temps.

First, I used the groupBy method from lodash to go through the list of objects returned for each three-hour chunk and group them by day. The dt_txt property was the full date, down to the second so I had to truncate the string to only include the year, month, and date.

```
const groupedByDay = _.groupBy(data.list, item =>
      item.dt_txt.substring(0, 10)
    );
```

I used the reduce method to go through all of the data for each day and return the high and low temps.

```
getHighAndLowTemps(day) {
    let minMax = Object.values(day).reduce((acc, current) => {
      let val = current.main.temp_min;
      acc[0] = acc[0] === undefined || val < acc[0] ? val : acc[0];
      acc[1] = acc[1] === undefined || val > acc[1] ? val : acc[1];

      return acc;
    }, []);

    return minMax;
  }
```

Each three hour chunk also had a description for the weather like "Clear", "Clouds", "Rain", etc.

I used the reduced method again to count the number of occurrences of each one and return the most common. The image displayed on each weather card is based on the result of this function.

```
getGeneralForecast(day) {

    let o = Object.values(day).reduce(
      function(o, c) {
        let s = c.weather[0].main;
        o.freq[s] = (o.freq[s] || 0) + 1;

        if (!o.freq[o.most] || o.freq[s] > o.freq[o.most]) o.most = s;


        return o;
      },
      { freq: {}, most: '' }
    );
    let result = o.most;

    return result;
  }
```
