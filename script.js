async function getLocation() {
    const pincode = document.getElementById('pincode').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (!pincode || isNaN(pincode) || pincode.length !== 6) {
      resultDiv.innerHTML = '<p>Please enter a valid 6-digit pincode.</p>';
      return;
    }
  
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
  
      if (data[0].Status === "Success") {
        const postOffices = data[0].PostOffice;
  
        if (postOffices && postOffices.length > 0) {
          const mainOffice = postOffices[0];
          const areas = postOffices.map((office) => office.Name).join(', ');
  
          resultDiv.innerHTML = `
            <p><strong>Area:</strong> ${mainOffice.Name}</p>
            <p><strong>Pincode:</strong> ${mainOffice.Pincode}</p>
            <p><strong>City:</strong> ${mainOffice.Block}</p>
            <p><strong>State:</strong> ${mainOffice.State}</p>
            <p><strong>District:</strong> ${mainOffice.District}</p>
            <p><strong>Nearby Areas:</strong> ${areas}</p>
            <p><strong>Country:</strong> ${mainOffice.Country}</p>
          `;
        } else {
          resultDiv.innerHTML = '<p>No data found for this pincode.</p>';
        }
      } else {
        resultDiv.innerHTML = '<p>No data found for this pincode.</p>';
      }
    } catch (error) {
      resultDiv.innerHTML = '<p>Error fetching data. Please try again.</p>';
    }
  }  