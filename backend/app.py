# from flask_cors import CORS
import os
from flask import Flask, session, flash, g, request, json
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, UserHousehold, Household
from sqlalchemy.exc import IntegrityError

# API_BASE_URL = "URL"
CURR_USER_KEY = "curr_user"

app = Flask(__name__)
# CORS(app)

app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///capstone_2_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
debug = DebugToolbarExtension(app)

connect_db(app)
db.drop_all()
db.create_all()

# Remove SECRET_KEY for Production
app.config['SECRET_KEY'] = "SuperSecret"



############################## AUTH ROUTES ##############################

@app.before_request
def add_user_to_g():
    """If we are logged in, add curr_user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response       

def do_login(user):
    """Log a user in."""

    session[CURR_USER_KEY] = user.id

def do_logout():
    """Log a user out."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]



@app.route("/api/register", methods=["GET", "POST", "OPTIONS"])
def register():
    print(request.json)

    username = request.json.get("username")
    password = request.json.get("password")

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]

    try:
        user = User.register(username, password)
        db.session.add(user)
        db.session.commit()

    except IntegrityError as e:
        flash("Username already taken", 'danger')

    do_login(user)
    session["user_id"] = user.id

    flash("You are now registered!", "success")
    return str(user.id)

@app.route("/api/login", methods=["GET", "POST", "OPTIONS"])
def login():
    print(request.json)

    username = request.json.get("username")
    password = request.json.get("password")

    user = User.authenticate(username, password)
    print("user: " + str(user))

    if user:
        do_login(user)
        flash(f"Welcome, {user.username}!", "success")

        # Keep User Logged In
        session["user_id"] = user.id

        return str(user.id)

    else:
        flash("Username already taken", 'danger')
        return None # need to figure out how to return errors to the user


@app.route('/api/logout')
def logout():
    """Handle user logout."""

    if not g.user:
        flash("You Are Not Logged In.", "danger")

    do_logout()
    flash('You have been logged out.', 'success')


############################## USER ROUTES ##############################

@app.route("/api/user", methods=["GET", "OPTIONS"])
def getCurrentUser():
    print(request.args)

    userId = request.args.get("userId")
    
    if not g.user:
        flash("Access unauthorized.", "danger")
        return None
    
    # Get user by id
    currentUser = User.query.filter(User.id == userId).one()

    # Return user as json
    return currentUser.as_dict()

# TODO Update

############################## HOUSEHOLD ROUTES ##############################

def row2dict(r):
    return {c.name: str(getattr(r, c.name)) for c in r.__table__.columns}


@app.route("/api/households", methods=["GET", "OPTIONS"])
def getUserHouseholds():
    print(request.args)

    userId = request.args.get("userId")
    
    if not g.user:
        flash("Access unauthorized.", "danger")
        return None
    
    # Get list of households for user
    households = UserHousehold.query\
        .filter(UserHousehold.userID == userId)\
        .all()
        # .join(Household, UserHousehold.householdID == Household.id)\
        # .add_columns(Household.name, Household.street_address, Household.city, Household.state, Household.zip, Household.photo, Household.notes)\

    if not households:
        return []

    # Create returnable json list of households, turn each row into dict object
    householdsList = json.dumps(households, default = lambda x:x.as_dict())

    # Return households as json
    return householdsList

@app.route("/api/household", methods=["GET", "OPTIONS"])
def getHousehold():
    print(request.args)

    householdId = request.args.get("householdId")
    
    if not g.user:
        flash("Access unauthorized.", "danger")
        return None
    
    # Get household by id
    household = Household.query.filter(Household.id == householdId).one()

    # Return household as json
    return household.as_dict()

@app.route("/api/household", methods=["POST", "OPTIONS"])
def createHousehold():
    print(request.json)
    
    if not g.user:
        flash("Access unauthorized.", "danger")
        return None
    
    # Create new household class
    newHousehold = Household()
    newHousehold.name = request.json.get("name")
    newHousehold.street_address = request.json.get("address")
    newHousehold.city = request.json.get("city")
    newHousehold.state = request.json.get("state")
    newHousehold.zip = request.json.get("zip")
    newHousehold.notes = request.json.get("notes")  

    # Add household to DB
    db.session.add(newHousehold)
    db.session.commit()

    # Create new record for user household class
    newUserHousehold = UserHousehold()
    newUserHousehold.userID = g.user.id
    newUserHousehold.householdID = newHousehold.id

    # Add user household to DB
    db.session.add(newUserHousehold)
    db.session.commit()

    # Return household as json
    return newHousehold.as_dict()

@app.route("/api/household", methods=["PATCH", "OPTIONS"])
def updateHousehold():
    print(request.json)
    householdId = request.json.get("id")
     
    if not g.user:
        flash("Access unauthorized.", "danger")
        return None
    
    # Get household by id
    household = Household.query.filter(Household.id == householdId).one()
    
    # Update household class
    household.name = request.json.get("name")
    household.street_address = request.json.get("address")
    household.city = request.json.get("city")
    household.state = request.json.get("state")
    household.zip = request.json.get("zip")
    household.notes = request.json.get("notes")  

    # Update household in DB
    db.session.commit()

    # Return household as json
    return household.as_dict()

@app.route("/api/household/delete", methods=["POST", "OPTIONS"])
def deleteHousehold():
    # TODO this isn't really working. The front is throwing a 415 unsupported media type whenever trying to get to this endpoint

    print(request.json)
    householdId = request.json.get("householdId")
     
    if not g.user:
        flash("Access unauthorized.", "danger")
        return None
    
    # Get household by id
    household = Household.query.filter(Household.id == householdId).one()
    
    # Delete household from userHousehold
    # db.session.delete(userHousehold)
    db.session.delete(household)
    db.session.commit()

    # Return if complete
    return "Deleted"