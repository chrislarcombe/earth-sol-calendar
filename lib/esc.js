/*
Earth-Sol Calendar - Calendar based on the natural cycles of the Earth and Sun.
Written in 2020 by Chris Larcombe <chris@larcombe.io>

To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
*/

Date.prototype.esc = function()
{
	var isLeapYear = function(d)
	{
	    var year = d.getFullYear();
	    if((year & 3) != 0) return false;
	    return ((year % 100) != 0 || (year % 400) == 0);
	};
	var getDayOfYear = function(d)
	{
	    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	    var mn = d.getMonth();
	    var dn = d.getDate();
	    var dayOfYear = dayCount[mn] + dn;
	    if(mn > 1 && isLeapYear(d)) dayOfYear++;
	    return dayOfYear;
	};

	var doy = getDayOfYear(this);
	var escDOY;
	var leapDiff = (isLeapYear(this) ? 1 : 0);

	if (doy >= 356 + leapDiff) // Dec 22 = 356 (non-leap) or 357 (leap)
		escDOY = doy - (365-10) - leapDiff;
	else
		escDOY = doy + 10;

	var day, strong, date, month, transcal;

	if (escDOY <= 180)
	{
		month = Math.ceil(escDOY / 30);
		date = escDOY - 30*(month-1) ;
	}
	else if (escDOY >= 181 && escDOY <= 182 + leapDiff)
	{
		if (escDOY == 183)
		{
			transcal = null;
			day = 'L';
		}
		else
		{
			transcal = escDOY - 180;
		}
	}
	else if (escDOY >= 363 + leapDiff)
	{
		transcal = escDOY - 362 - leapDiff;

		if (transcal == 3)
		{
			transcal = null;
			day = 'N';
		}
	}
	else
	{
		month = Math.ceil((escDOY-2-leapDiff) / 30);
		date = (escDOY-2-leapDiff) - 30*(month-1);
	}

	if (!transcal && day != 'L' && day != 'N')
	{
		strong = Math.ceil(date / 6);
		day = date - (strong-1)*6;
	}

	var time = [0,0,0];
	time[0] = Math.floor(this.getHours()/ 3);
	time[1] = Math.floor((this.getHours()*60 + this.getMinutes()) / 30) - time[0]*6;
	time[2] = Math.floor((this.getHours()*60 + this.getMinutes()) / 5) - time[0]*6*6 - time[1]*6;

	var time_alt = [0,0];
	time_alt[0] = Math.floor(this.getHours()/ 3);
	time_alt[1] = Math.floor((this.getHours()*60 + this.getMinutes()) / (180/8)) - time_alt[0]*8;

	return {time: time, time_alt: time_alt, day: day, strong: strong, month: month, date: date, year: this.getFullYear() - 2012 + (escDOY <= 10 ? 1 : 0) + (day == 'N' ? 1 : 0) , transcal: transcal};
};