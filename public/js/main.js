var Timer = {
	value: 0,
	seconds: 0,
	minutes: 0,
	hours: 0,
	timing: false, // Indicating whether the timer is running

	hoursDisplay: $('#hours span'),
	minutesDisplay: $('#minutes span'),
	secondsDisplay: $('#seconds span'),

	start: function() {
		// Prevent Timer from being started twice
        if(this.timing === false) {
            this.timing = true;
            this.incrementTimer();
        }
    },

	incrementTimer: function() {
		var _this = this;

		_this.value++;

			if(_this.seconds + 1 == 60) {
				_this.seconds = 0;
				if(_this.minutes + 1 == 60) {
					_this.minutes = 0;
					_this.hours++;
                    
                    macgap.growl.notify({
                        title: "Timer",
                        content: _this.hours + " hours completed!"
                    });
				} else {
					_this.minutes++;
				}
			} else {
				_this.seconds++;
			}
			
			// Update the UI
			_this.hoursDisplay.text(_this.hours);
			_this.minutesDisplay.text(_this.minutes);
			_this.secondsDisplay.text(_this.seconds);

			if(_this.timing === true) {
				setTimeout(function() {
					if(_this.timing === true) {
						_this.incrementTimer();
					}
				}, 1000);
			}
	},

	pause: function() {
		this.timing = false;
	},

	stop: function() {
		this.timing = false;
		this.reset();
	},

	reset: function() {
		this.value = 0;
		this.seconds = 0;
		this.minutes = 0;
		this.hours = 0;

		this.hoursDisplay.text('0');
		this.minutesDisplay.text('0');
		this.secondsDisplay.text('0');
	},

	getValue: function() {
		return this.value;
	}
};

$(document).ready(function() {
	$('#play').click(function() {
        $('#controls i').removeClass('active');
        $(this).addClass('active');
        Timer.start();
		return false;
	});

	$('#pause').click(function() {
        $('#controls i').removeClass('active');
        $(this).addClass('active');
		Timer.pause();
		return false;
	});

	$('#stop').click(function() {
                     $('#controls i').removeClass('active');
		Timer.stop();
		return false;
	});
});