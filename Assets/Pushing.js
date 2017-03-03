#pragma strict

enum mode { Idle, Moving, Reverse };
    var currentMode = mode.Idle;
    var currentSpeed = 0.0;
    var maxSpeed = 4.0;
    var maxReverseSpeed = -2.0;

var animator: Animator;
var ps: ParticleSystem;
var rb: Rigidbody;

function Start () {
	animator = GetComponent.<Animator>();
	animator.SetBool("Moving", false);
	animator.SetBool("MovingBack", false);
	animator.SetBool("Turning", false);

	ps = GetComponent.<ParticleSystem>();

	rb = GetComponent.<Rigidbody>();
}

function Update () {

	//Input phase split out - I like to do this but it's optional
	switch(currentMode) {
		case mode.Idle:
			if(Input.GetKey(KeyCode.W)) { 
				currentMode = mode.Moving;
			}
			if(Input.GetKeyDown(KeyCode.S)) {
				currentMode = mode.Reverse;
			}
		break;
		case mode.Moving:
			if(Input.GetKeyDown(KeyCode.S)) {
				currentMode = mode.Idle;
			}
			if(!Input.GetKey(KeyCode.W)) {
				currentMode = mode.Idle;
			}
		break;
		case mode.Reverse:
			if(!Input.GetKey(KeyCode.S)) {
				currentMode = mode.Idle;
			}
		break;
	}
           //Movement phase 
	switch(currentMode) {
		case mode.Idle:
			animator.SetBool("Moving", false);
			animator.SetBool("MovingBack", false);
			ps.emission.enabled = false;
			currentSpeed = Mathf.Lerp(currentSpeed, 0, 3 * Time.deltaTime); //Or MoveTowards
		break;
		case mode.Moving:
			animator.SetBool("Moving", true);
			animator.SetBool("MovingBack", false);
			ps.emission.enabled = true;
			currentSpeed = Mathf.Lerp(currentSpeed, maxSpeed, 4 * Time.deltaTime); //Or MoveTowards
		break;
		case mode.Reverse:
			animator.SetBool("Moving", false);
			animator.SetBool("MovingBack", true);
			ps.emission.enabled = false;
			currentSpeed = Mathf.Lerp(currentSpeed, maxReverseSpeed, Time.deltaTime); //Or MoveTowards
		break;
	}
           //Actually move
	transform.Translate(0,0, Time.deltaTime * currentSpeed);

	if (Input.GetKeyDown("h")) {
		transform.eulerAngles.x = 0;
		transform.eulerAngles.z = 0;
//		transform.Translate(Vector3.up * Mathf.Lerp(0, 30, Time.deltaTime));
//		rb.AddForce(0,3,0, ForceMode.VelocityChange);
	}

    if (Input.GetKey("a")) {
        transform.Rotate(Vector3.up * Time.deltaTime * -200);
        animator.SetBool("Turning", true);
    }
   
    if (Input.GetKey("d")) {
        transform.Rotate(Vector3.up * Time.deltaTime * 200);
        animator.SetBool("Turning", true);
    }

    if ( !Input.GetKey("d") && !Input.GetKey("a") || Input.GetKey("w") || Input.GetKey("s") ) {
    	animator.SetBool("Turning", false);
    }
}
