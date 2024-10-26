
let check_touch = false
let event_count = 0
let average_accel = 0;
let total_accel = 0;
let classify = 0;

document.getElementById('touch').innerHTML = check_touch

window.addEventListener('touchend', function(event) {
  check_touch = false
  document.getElementById('touch').innerHTML = check_touch
  average_accel = total_accel / event_count
  document.getElementById('AverageAccel').innerHTML = average_accel;
  document.getElementById('TotalAccel').innerHTML = total_accel;
  document.getElementById('EventCount').innerHTML = event_count;
  if (average_accel<=20) {
    classify = 0;
    
  } else if (average_accel<30){
    classify = 1;
  } else {
    classify = 2;
  }
  document.getElementById('Classify').innerHTML = classify;
  average_accel = 0;
  event_count = 0;
  total_accel = 0;
  
});

window.addEventListener('touchstart', function(event) {
  check_touch = true
  document.getElementById('touch').innerHTML = check_touch
});



function updateFieldIfNotNull(fieldName, value, precision=10){
  if (value != null)
    document.getElementById(fieldName).innerHTML = value.toFixed(precision);
}



function handleMotion(event) {
  updateFieldIfNotNull('Accelerometer_gx', event.acceleration.x);
  updateFieldIfNotNull('Accelerometer_gy', event.acceleration.y);
  updateFieldIfNotNull('Accelerometer_gz', event.acceleration.z);

  // updateFieldIfNotNull('Accelerometer_x',);
  // updateFieldIfNotNull('Accelerometer_y', );
  // updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);
  if (check_touch) {
    total_accel = Math.abs(event.acceleration.x) + Math.abs(event.acceleration.y) + total_accel;
    // console.log("X: " +  event.acceleration.x);
    // console.log("Y: " +  event.acceleration.y);
    // console.log("Z: " +  event.acceleration.z);
    event_count ++ ; 
  }
}

function reset_input(){
  average_accel = 0;
  event_count = 0;
  total_accel = 0;
  document.getElementById('AverageAccel').innerHTML = average_accel;
  document.getElementById('TotalAccel').innerHTML = total_accel;
  document.getElementById('EventCount').innerHTML = event_count;
}

function handleOrientation(event) {
  updateFieldIfNotNull('Orientation_a', event.alpha);
  updateFieldIfNotNull('Orientation_b', event.beta);
  updateFieldIfNotNull('Orientation_g', event.gamma);
  // console.log("X: " +  event.alpha);
  // console.log("Y: " +  event.beta);
  // console.log("Z: " +  event.gamma);
  if ((event.beta < 0 && event.gamma>50) || (event.beta < 0 && event.gamma<-50)){
    reset_input()
  }
  // incrementEventCount();
}

window.addEventListener('deviceorientation', function(event) {
  handleOrientation(event);
});

window.addEventListener('devicemotion', function(event) {
  handleMotion(event);

});

