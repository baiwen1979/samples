package org.biwin.hello;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Hello extends CordovaPlugin {

	/**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback id used when calling back into JavaScript.
     * @return                  True if the action was valid, false if not.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    	if ("sayHello".equals(action)) {
            JSONObject r = new JSONObject();
            String message = this.sayHello(args.getString(0));
            r.put("message", message);
            callbackContext.success(r);
        }
        else {
            return false;
        }
        return true;
    }

	public String sayHello(String whom) {
		return "Hello, " + whom + "! This is a simple cordova plugin.";
	}
}