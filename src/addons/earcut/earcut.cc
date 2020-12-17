#include <node_api.h>
#include <array>
#include "earcut.hpp"

napi_value Method(napi_env env, napi_callback_info info) {
  napi_value result;
  napi_status status;
  napi_value number;
  status = napi_create_array(env, &result);
  if (status != napi_ok) return nullptr;

  napi_value args[1];
  size_t argsLength = 1;
  napi_valuetype argsType;
  status = napi_get_cb_info(env, info, &argsLength, args, nullptr, nullptr);
  if (status != napi_ok) return nullptr;
  status = napi_typeof(env, args[0], &argsType);
  if (status != napi_ok) return nullptr;

  using N = uint32_t;
  using Point = std::array<double, 2>;
  uint32_t i, j, length;
  Point vertex;
  std::vector<Point> vertices;
  status = napi_get_array_length(env, args[0], &length);
  if (status != napi_ok) return nullptr;
  for (i = 0; i < length; i++) {
    for (j = 0; j < 2; j++) {
      status = napi_get_element(env, args[0], i + j, &number);
      if (status != napi_ok) return nullptr;
      status = napi_get_value_double(env, number, &vertex[j]);
      if (status != napi_ok) return nullptr;
    }
    i++;
    vertices.push_back(vertex);
  }

  std::vector<std::vector<Point>> polygon;
  polygon.push_back(vertices);
  std::vector<N> index = mapbox::earcut<N>(polygon);
  for (i = 0; i < index.size(); i++) {
    status = napi_create_double(env, index[i], &number);
    if (status != napi_ok) return nullptr;
    status = napi_set_element(env, result, i, number);
    if (status != napi_ok) return nullptr;
  }

  return result;
}

napi_value init(napi_env env, napi_value exports) {
  napi_status status;
  napi_value fn;

  status = napi_create_function(env, nullptr, 0, Method, nullptr, &fn);
  if (status != napi_ok) return nullptr;

  status = napi_set_named_property(env, exports, "earcut", fn);
  if (status != napi_ok) return nullptr;

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)