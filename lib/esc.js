/*

Earth-Sol Calendar - Calendar based on the natural cycles of the Earth and Sun.
Written in 2020 by Chris Larcombe <chris@larcombe.io>

To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

*/

Date.prototype.esc=function(){var t,e,a,l,n,r,o,c,h,i,u=function(t){var e=t.getFullYear();return 0==(3&e)&&(e%100!=0||e%400==0)},s=(e=(t=this).getMonth(),a=t.getDate(),l=[0,31,59,90,120,151,181,212,243,273,304,334][e]+a,e>1&&u(t)&&l++,l),g=u(this)?1:0;return(n=s>=356+g?s-355-g:s+10)<=180?c=n-30*((h=Math.ceil(n/30))-1):n>=181&&n<=182+g?183==n?(i=null,r="L"):i=n-180:n>=363+g?3==(i=n-362-g)&&(i=null,r="N"):c=n-2-g-30*((h=Math.ceil((n-2-g)/30))-1),i||"L"==r||"N"==r||(r=c-6*((o=Math.ceil(c/6))-1)),{day:r,strong:o,month:h,date:c,year:this.getFullYear()-2012+(n<=10?1:0)+("N"==r?1:0),transcal:i}};