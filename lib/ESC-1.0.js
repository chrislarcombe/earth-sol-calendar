/*

Earth-Sol Calendar - Calendar based on the natural cycles of the Earth and Sun.
Copyright (C) 2020 Chris Larcombe

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

Date.prototype.getESC = function()
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

	var day, week, date, month, intercal;

	if (escDOY <= 180)
	{
		month = Math.ceil(escDOY / 30);
		date = escDOY - 30*(month-1) ;
	}
	else if (escDOY >= 181 && escDOY <= 182 + leapDiff)
	{
		intercal = escDOY == 183 ? 'L' : escDOY - 180;
	}
	else if (escDOY >= 363 + leapDiff)
	{
		intercal = escDOY - 362 - leapDiff + 2;
	}
	else
	{
		month = Math.ceil((escDOY-2-leapDiff) / 30);
		date = (escDOY-2-leapDiff) - 30*(month-1) ;
	}
	if (!intercal)
	{
		week = Math.ceil(date / 6);
		day = date - (week-1)*6;
	}

	return {day: day, week: week, month: month, date: date, year: this.getFullYear() - 2012 + (escDOY <= 10 ? 1 : 0) , intercal: intercal};
};


Date.prototype.getESCDay = function()
{
	return this.getESC().day;
};

Date.prototype.getESCWeek = function()
{
	return this.getESC().week;
};

Date.prototype.getESCMonth = function()
{
	return this.getESC().month;
};

Date.prototype.getESCDate = function()
{
	return this.getESC().date;
};

Date.prototype.getESCDateString = function()
{
	var d = this.getESC();

	if (d.month)
		return (d.date<10?"0":"") + d.date + "-" + (d.month<10?"0":"") +  d.month + "-" + d.year;
	else
		return "@" + d.intercal + "-" + d.year;
};

Date.prototype.getESCDateStringShort = function()
{
	var d = this.getESC();

	if (d.month)
		return d.month + "/" + d.year;
	else
		return "@" + d.intercal + "-" + d.year;
};

Date.prototype.getESCDayString = function()
{
	var d = this.getESC();
	if (d.day && d.week)
		return d.day + "-"+ d.week
	else
		return 'X-X'
};

Date.prototype.getESCString = function()
{
	return this.getESCDayString() + " " + this.getESCDateString() + " " + this.toTimeString();
};