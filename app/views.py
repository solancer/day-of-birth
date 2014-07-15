from flask import *
from app import app
from dob import dob
from datetime import datetime

@app.route('/')
def index():
    selectRange = range(1920, datetime.today().year)
    return render_template('index.html', selectRange=selectRange)

@app.route('/parse', methods=['POST', 'GET'])
def parse():
    error =  None
    results = None
    if request.method == 'GET':
          dywb = dob.Dob()
          raw_yy = int(request.args.get('year', ''))
          raw_mm = int(request.args.get('month', ''))
          raw_dd = int(request.args.get('days', ''))
          ResDay = dywb.dayOfdob(raw_yy,raw_mm,raw_dd)
          zod_sign = dywb.zodiac(raw_mm, raw_dd)
          is_leap = dywb.leapYear(raw_yy)
          #Age Convertion
          ConAgeDob  =  datetime(raw_yy, raw_mm, raw_dd)
          Now  =  datetime.today()
          ConAgeRes  =  Now - ConAgeDob
          AgeInDays  =  ConAgeRes.days
          AgeInHours =  AgeInDays * 24
          AgeInMins  =  AgeInHours * 60
          AgeInSecs  =  AgeInMins * 60
          #check if leap year
          if is_leap == 1:
              leap = "leap"
          else:
              leap = None
          age = dywb.ageCal(raw_yy,raw_mm,raw_dd)
          results = {'day':ResDay,
                     'zodiac':zod_sign,
                     'leap': leap,
                     'ageYY': age.years,
                     'ageMM': age.months,
                     'ageDD': age.days,
                     'ageInDays': AgeInDays,
                     'ageInHours': AgeInHours,
                     'ageInMins': AgeInMins,
                     'ageInSecs': AgeInSecs
          }
    else:
       error = "input all details"
    return render_template('parse.html', error=error, results=results)


