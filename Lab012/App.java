import com.google.gson.Gson;
import spark.Route;
import spark.Spark;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public class App {
    private static AtomicInteger nextId = new AtomicInteger(0);
    private static List<Map<String, Object>> notas = new ArrayList<>();

    public static void main(String[] args) {
        Spark.port(8080); // Puedes cambiar el puerto según tus necesidades

        // Endpoint para obtener el listado de notas
        Spark.get("/notas", getNotas, new JsonTransformer());

        // Endpoint para crear una nueva nota
        Spark.post("/notas", createNota, new JsonTransformer());

        // Endpoint para obtener una nota específica por su ID
        Spark.get("/notas/:id", getNotaById, new JsonTransformer());
    }

    // Método para obtener el listado de notas
    private static Route getNotas = (req, res) -> {
        double sum = notas.stream().mapToDouble(nota -> (int) nota.get("value")).sum();
        double average = notas.isEmpty() ? 0 : sum / notas.size();

        Map<String, Object> response = new HashMap<>();
        response.put("data", notas);
        response.put("average", average);
        return response;
    };

    // Método para crear una nueva nota
    private static Route createNota = (req, res) -> {
        int value = Integer.parseInt(req.body());
        Map<String, Object> newNota = new HashMap<>();
        newNota.put("id", nextId.getAndIncrement());
        newNota.put("value", value);
        notas.add(newNota);
        return notas;
    };

    // Método para obtener una nota por su ID
    private static Route getNotaById = (req, res) -> {
        int id = Integer.parseInt(req.params(":id"));
        return id >= 0 && id < notas.size() ? notas.get(id) : new HashMap<>();
    };

    // Clase para transformar la respuesta a JSON
    private static class JsonTransformer implements spark.ResponseTransformer {
        private Gson gson = new Gson();

        @Override
        public String render(Object model) {
            return gson.toJson(model);
        }
    }
}