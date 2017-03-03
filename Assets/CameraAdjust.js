#pragma strict

function Start () {
	
}

function Update () {
	var d = Input.GetAxis("Mouse ScrollWheel");
	if (d > 0f) {
		if (transform.localScale.z < 2.5) {
			transform.localScale += new Vector3(0, 0, 0.1F);
		}
	}
	else if (d < 0f) {
		if (transform.localScale.z > 0.1) {
			transform.localScale += new Vector3(0, 0, -0.1F);
		}
	}
}
