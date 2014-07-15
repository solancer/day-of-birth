#!/usr/bin/env python

'''

 Calculates the day from a given DOB and other interesting information

 @author: Srinivas Gowda (srinivas@solancer.com)

'''
from dateutil.relativedelta import relativedelta
from datetime import datetime

class Dob():

    #strips the year, finds the number of leap years and the day
    def dayOfdob(self,raw_year,raw_month,raw_day):
        strip1=raw_year/100
        strip2=strip1*100
        strpd_year=raw_year%strip2
        leap_years=strpd_year/4
        month_dic= {1:1, 2:4 ,3:4, 4:0, 5:2, 6:5, 7:0, 8:3, 9:6, 10:1, 11:4, 12:6 }
        month_code=month_dic[raw_month]
        total=strpd_year+leap_years+month_code+raw_day
        day_num=total%7
        week = {1:'Sunday',2:'Monday',3:'Tuesday',4:'Wednesday',5:'Thursday',6:'Friday',0:'Saturday' }
        Day = week[day_num]
        return (Day)

    #leap or not
    def leapYear(self, raw_year):
        if (raw_year%4 == 0 and not (raw_year%100 == 0 and not (raw_year%400 == 0))):
            is_leap = 1
        else:
            is_leap = 0
        return (is_leap)


    #Finds the zodiac Sign of the DOB
    def zodiac(self, raw_month, raw_day):
        if (raw_month == 1 and raw_day >= 21) or (raw_month == 2 and raw_day <= 19):
            zod_sign = "Aquarius"
        elif (raw_month == 2 and raw_day >= 20) or (raw_month == 3 and raw_day <= 20):
            zod_sign = "Pisces"
        elif (raw_month == 3 and raw_day >= 21) or (raw_month == 4 and raw_day <= 20):
            zod_sign = "Aries"
        elif (raw_month == 4 and raw_day >= 21) or (raw_month == 5 and raw_day <= 21):
            zod_sign = "Taurus"
        elif (raw_month == 5 and raw_day >= 22) or (raw_month == 6 and raw_day <= 21):
            zod_sign = "Gemini"
        elif (raw_month == 6 and raw_day >= 22) or (raw_month == 7 and raw_day <= 22):
            zod_sign = "Cancer"
        elif (raw_month == 7 and raw_day >= 23) or (raw_month == 8 and raw_day <= 21):
            zod_sign = "Leo"
        elif (raw_month == 8 and raw_day >= 22) or (raw_month == 9 and raw_day <= 23):
            zod_sign = "Virgo"
        elif (raw_month == 9 and raw_day >= 24) or (raw_month == 10 and raw_day <= 23):
            zod_sign = "Libra"
        elif (raw_month == 10 and raw_day >= 24) or (raw_month == 11 and raw_day <= 22):
            zod_sign = "Scorpio"
        elif (raw_month == 11 and raw_day >= 23) or (raw_month == 12 and raw_day <= 22):
            zod_sign = "Sagittarius"
        elif (raw_month == 12 and raw_day >= 23) or (raw_month == 1 and raw_day <= 20):
            zod_sign = "Capricorn"
        return (zod_sign)

    #Calculates age
    def ageCal(self, raw_year, raw_month, raw_day):
        today = datetime.today()
        born = datetime(raw_year, raw_month, raw_day)
        # takes care of February 29 dob when the current year is not a leap year
        age = relativedelta(today, born)
        return (age)

# main() method accepts inputs, passes them on to appropriate methods and outputs the return values
if __name__ == "__main__":
        raw_year = int(raw_input('Enter year: '))
        raw_month = int(raw_input('Enter month: '))
        raw_day = int(raw_input('Enter day: '))
        if raw_year and raw_month and raw_day:
            dob = Dob()
            ResDay = dob.dayOfdob(raw_year,raw_month,raw_day)
            zod_sign = dob.zodiac(raw_month, raw_day)
            is_leap = dob.leapYear(raw_year)
            age = dob.ageCal(raw_year,raw_month,raw_day)
            # Converting age into days, hours, minutes, seconds
            ConAgeDob = datetime(raw_year, raw_month, raw_day)
            ConAgeNow = datetime.today()
            ConAgeRes = ConAgeNow - ConAgeDob
            AgeInDays = ConAgeRes.days
            AgeInHours = AgeInDays * 24
            AgeInMins = AgeInHours * 60
            AgeInSecs = AgeInMins * 60
            print "--------------------------------------------"
            print "You were born on a " +ResDay
            print ""
            if  is_leap is 1:
                print "You were born in a leap year"
            print ""
            if zod_sign:
                print "Your Zodiac Sign is " +zod_sign
            print ""
            if age:
                print "You are %d years %d months and %d days old"%(age.years, age.months, age.days)
                print ""
                print "or %d days old "%AgeInDays
                print ""
                print "or %d hours old"%AgeInHours
                print ""
                print "or %d Minutes old"%AgeInMins
                print ""
                print "or %d Seconds old"%AgeInSecs
